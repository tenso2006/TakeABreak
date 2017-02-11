'use strict';
(function() {
  const HELPERS = angular.module('zen.videomain', []);

  HELPERS.factory('VideoMain', function ($location, $window, Signaling) {
    var serverIP = "http://localhost:8000";
    var server = null;

    var localPeerConnection, localStream, signallingServer, localIsCaller;

    var videoStart = document.getElementById('start-button');
    var videoJoin = document.getElementById('join-button');
    var videoHangup = document.getElementById('hangup-button');

    var localVideo = document.getElementById('local-video');
    var remoteVideo = document.getElementById('remote-video');
    var inputRoomName = document.getElementById('room-name');

    videoHangup.disabled = true;

    function start() {
      // is starting the call
      localIsCaller = true;
      initConnection();
    }

    function join() {
      // just joining a call, not offering
      localIsCaller = false;
      initConnection();
    }

    function hangup() {
      // stop video stream
      if (localStream && localStream.getVideoTracks[0]) {
        localStream.getVideoTracks[0].stop();
      }

      // kill all connections
      if (localPeerConnection != null) {
        localPeerConnection.removeStream(localStream);
        localPeerConnection.close();
        signallingServer.close();
        localVideo.classList.remove('video-connected');
        remoteVideo.className = 'hidden';
        localVideo.src = "";
        remoteVideo.src = "";
      }

      videoStart.disabled = false;
      videoJoin.disabled = false;
      videoHangup.disabled = true;
    }

    function initConnection() {
      var room = inputRoomName.value;

      if (room == undefined || room.length <= 0) {
        alert('Please enter room name');
        return;
      }

      connect(room);

      videoStart.disabled = true;
      videoJoin.disabled = true;
      videoHangup.disabled = false;
    }

    var SignallingServer = Signaling.SignallingServer;

    var sdpConstraints = {
      optional: [],
      mandatory: {
        OfferToReceiveVideo: true,
      }
    }

    function connect(room) {
      // create peer connection
      localPeerConnection = new RTCPeerConnection(server);

      // create local data channel, send it to remote
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
      .then(function(stream) {
        // get and save local stream
        trace('Got stream, saving it now and starting RTC conn');

        // must add before calling setRemoteDescription() because then
        // it triggers 'addstream' event
        localPeerConnection.addStream(stream);
        localStream = stream;

        // show local video
        localVideo.src = window.URL.createObjectURL(stream);

        // can start once have gotten local video
        establishRTCConnection(room);
      })
      .catch(errorHandler);
    }

    function establishRTCConnection(room) {
      // create signalling server
      signallingServer = new SignallingServer(room, serverIP);
      signallingServer.connect();

      // a remote peer has joined room, initiate sdp exchange
      signallingServer.onGuestJoined = function() {
        trace('guest joined!')
        // set local description and send to remote
        localPeerConnection.createOffer(function(sessionDescription) {
          console.log(sessionDescription);
          trace('set local session desc with offer');
          localPeerConnection.setLocalDescription(sessionDescription);
          // send local sdp to remote
          signallingServer.sendSDP(sessionDescription);
        },
        function(event) {
          console.log('createOffer() error: ', event);
        });
      }

        // got sdp from remote
      signallingServer.onReceiveSdp = function(sdp) {
        // get stream again
        localPeerConnection.addStream(localStream);
        trace(localStream);

        // if local was the caller, set remote desc
        if (localIsCaller) {
          trace('is caller');
          trace('set remote session desc with answer');
          localPeerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
        }
        // if local is joining a call, set remote sdp and create answer
        else {
          trace('set remote session desc with offer');
          localPeerConnection.setRemoteDescription(new RTCSessionDescription(sdp))
          .then(function() {
            trace('make answer')
            localPeerConnection.createAnswer()
            .then(function(sessionDescription) {
              // set local description
              trace('set local session desc with answer');
              localPeerConnection.setLocalDescription(sessionDescription);
              // send local sdp to remote too
              console.log('created Answer successfully')
              signallingServer.sendSDP(sessionDescription);
            });
          })
          .catch(function(error) {
            console.log('Error with set peer connection', error);
          });
        }
      }

      // when received ICE candidate
      signallingServer.onReceiveICECandidate = function(candidate) {
        trace('Set remote ice candidate');
        localPeerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }

      // when room is full, alert user
      signallingServer.onRoomFull = function(room) {
        window.alert('Room "' + room + '"" is full! Please join or create another room');
      }

      // get ice candidates and send them over
      // wont get called unless SDP has been exchanged
      localPeerConnection.onicecandidate = function(event) {
        if (event.candidate) {
          //!!! send ice candidate over via signalling channel
          trace("Sending candidate");
          signallingServer.sendICECandidate(event.candidate);
        }
      }

      // when stream is added to connection, put it in video src
      localPeerConnection.onaddstream = function(data) {
        localVideo.className = 'video-connected';
        remoteVideo.classList.remove('hidden');
        remoteVideo.src = window.URL.createObjectURL(data.stream);
      }
    }

    function errorHandler(error) {
      console.error('Something went wrong!');
      console.error(error);
    }

    function trace(text) {
      console.info(text);
    }

    return {
      start: start,
      join: join,
      hangup: hangup
    };

  });
})();
