/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

(function() {
  const HELPERS = angular.module('zen.videohelpers', []);

  HELPERS.factory('VideoHelpers', function ($location, $window) {
    const startButton = document.getElementById('startButton');
    const callButton = document.getElementById('callButton');
    const hangupButton = document.getElementById('hangupButton');

    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');

    let startTime, localStream, pc1, pc2;
    let total = '';

    callButton.disabled = true;
    hangupButton.disabled = true;

    function trace(text) {
      total += text;
      console.log((window.performance.now() / 1000).toFixed(3) + ': ' + text);
    }

    localVideo.addEventListener('loadedmetadata', function() {
      trace('Local video videoWidth: ' + this.videoWidth +
        'px,  videoHeight: ' + this.videoHeight + 'px');
    });

    remoteVideo.addEventListener('loadedmetadata', function() {
      trace('Remote video videoWidth: ' + this.videoWidth +
        'px,  videoHeight: ' + this.videoHeight + 'px');
    });

    remoteVideo.onresize = function() {
      trace('Remote video size changed to ' +
        remoteVideo.videoWidth + 'x' + remoteVideo.videoHeight);
      // We'll use the first onsize callback as an indication that video has started
      // playing out.
      if (startTime) {
        var elapsedTime = window.performance.now() - startTime;
        trace('Setup time: ' + elapsedTime.toFixed(3) + 'ms');
        startTime = null;
      }
    };


    var offerOptions = {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    };

    function getName(pc) {
      return (pc === pc1) ? 'pc1' : 'pc2';
    }

    function getOtherPc(pc) {
      return (pc === pc1) ? pc2 : pc1;
    }

    function gotStream(stream) {
      trace('Received local stream');
      localVideo.srcObject = stream;
      localStream = stream;
      callButton.disabled = false;
    }

    function start() {
      trace('Requesting local stream');
      startButton.disabled = true;
      //Navigator loaded by WebRTC in adapater-latest.js
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
      .then(gotStream)
      .catch(function(e) {
        alert('getUserMedia() error: ' + e.name);
      });
    }

    function call() {
      var videoTracks = localStream.getVideoTracks();
      var audioTracks = localStream.getAudioTracks();
      var servers = null;

      callButton.disabled = true;
      hangupButton.disabled = false;
      startTime = window.performance.now();
      trace('Starting call');

      if (videoTracks.length > 0) {
        trace('Using video device: ' + videoTracks[0].label);
      }
      if (audioTracks.length > 0) {
        trace('Using audio device: ' + audioTracks[0].label);
      }

      pc1 = new RTCPeerConnection(servers);
      trace('Created local peer connection object pc1');
      pc1.onicecandidate = function(e) {
        onIceCandidate(pc1, e);
      };

      pc2 = new RTCPeerConnection(servers);
      trace('Created remote peer connection object pc2');
      pc2.onicecandidate = function(e) {
        onIceCandidate(pc2, e);
      };

      pc1.oniceconnectionstatechange = function(e) {
        onIceStateChange(pc1, e);
      };
      pc2.oniceconnectionstatechange = function(e) {
        onIceStateChange(pc2, e);
      };

      pc2.onaddstream = gotRemoteStream;

      pc1.addStream(localStream);
      trace('Added local stream to pc1');
      trace('pc1 createOffer start');
      pc1.createOffer(
        offerOptions
      ).then(
        onCreateOfferSuccess,
        onCreateSessionDescriptionError
      );
    }

    function onCreateSessionDescriptionError(error) {
      trace('Failed to create session description: ' + error.toString());
    }

    function onCreateOfferSuccess(desc) {
      trace('Offer from pc1\n' + desc.sdp);
      trace('pc1 setLocalDescription start');
      pc1.setLocalDescription(desc).then(
        function() {
          onSetLocalSuccess(pc1);
        },
        onSetSessionDescriptionError
      );
      trace('pc2 setRemoteDescription start');
      pc2.setRemoteDescription(desc).then(
        function() {
          onSetRemoteSuccess(pc2);
        },
        onSetSessionDescriptionError
      );
      trace('pc2 createAnswer start');
      // Since the 'remote' side has no media stream we need
      // to pass in the right constraints in order for it to
      // accept the incoming offer of audio and video.
      pc2.createAnswer().then(
        onCreateAnswerSuccess,
        onCreateSessionDescriptionError
      );
    }

    function onSetLocalSuccess(pc) {
      trace(getName(pc) + ' setLocalDescription complete');
    }

    function onSetRemoteSuccess(pc) {
      trace(getName(pc) + ' setRemoteDescription complete');
    }

    function onSetSessionDescriptionError(error) {
      trace('Failed to set session description: ' + error.toString());
    }

    function gotRemoteStream(e) {
      remoteVideo.srcObject = e.stream;
      trace('pc2 received remote stream');
    }

    function onCreateAnswerSuccess(desc) {
      trace('Answer from pc2:\n' + desc.sdp);
      trace('pc2 setLocalDescription start');
      pc2.setLocalDescription(desc).then(
        function() {
          onSetLocalSuccess(pc2);
        },
        onSetSessionDescriptionError
      );
      trace('pc1 setRemoteDescription start');
      pc1.setRemoteDescription(desc).then(
        function() {
          onSetRemoteSuccess(pc1);
        },
        onSetSessionDescriptionError
      );
    }

    function onIceCandidate(pc, event) {
      getOtherPc(pc).addIceCandidate(event.candidate)
      .then(
        function() {
          onAddIceCandidateSuccess(pc);
        },
        function(err) {
          onAddIceCandidateError(pc, err);
        }
      );
      trace(getName(pc) + ' ICE candidate: \n' + (event.candidate ?
          event.candidate.candidate : '(null)'));
    }

    function onAddIceCandidateSuccess(pc) {
      trace(getName(pc) + ' addIceCandidate success');
    }

    function onAddIceCandidateError(pc, error) {
      trace(getName(pc) + ' failed to add ICE Candidate: ' + error.toString());
    }

    function onIceStateChange(pc, event) {
      if (pc) {
        trace(getName(pc) + ' ICE state: ' + pc.iceConnectionState);
        console.log('ICE state change event: ', event);
      }
    }

    function hangup() {
      trace('Ending call');
      pc1.close();
      pc2.close();
      pc1 = null;
      pc2 = null;
      hangupButton.disabled = true;
      callButton.disabled = false;
    }

    return {
      start: start,
      call: call,
      hangup: hangup
    };
  });
})();
