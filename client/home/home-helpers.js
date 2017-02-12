// Factory Service
(function() {
  const SERVICES = angular.module('zen.homehelpers', []);

  SERVICES.factory('Break', function() {
    return {
      onBreak: false,
      type: '',
      title: '',
      audio: '',
      video: '',
      description: '',
      hasAudio: function() {
        return this.audio.length > 0;
      },
      hasVideo: function() {
        return this.video.length > 0;
      }
    }
  });

  SERVICES.factory('Timer', function() {
    return {
      now: now,
      formatTime: formatTime
    };

    function now() {
      var date = new Date();
      return date.getTime();
    }

    function formatTime(milliseconds) {
      var minutes = Math.floor(milliseconds / (1000 * 60));
      var seconds = Math.round((milliseconds % (1000 * 60) / 1000), 0);
      return pad(minutes) + ':' + pad(seconds);
    }

    function pad(num) {
      return num.toString().length > 1 ? num : '0'.concat(String(num));
    }
  });

  SERVICES.factory('Masters', function() {
    const options = [
      {
        id: '1',
        guru: 'Master Mind',
        text: 'inner-focused',
        pattern: ['Mental', 'Mental', 'Physical', 'Mental']
      },
      {
        id: '2',
        guru: 'Master Mix',
        text: 'a nice balance',
        pattern: ['Mental', 'Physical', 'Mental', 'Physical']
      },
      {
        id: '3',
        guru: 'Master Move',
        text: 'body-focused',
        pattern: ['Physical', 'Physical', 'Mental', 'Physical']
      }
    ];

    return {
      options: options,
      selected: options[1]
    }
  });

  SERVICES.factory('Focus', function() {
    const options = [
      {
        id: '1',
        focus: 'blue',
        text: '25 minutes',
        length: 1000 * 2 * 1,
        pattern: ['Step', 'Step', 'Step', 'Leap'],
      },
      {
        id: '2',
        focus: 'white',
        text: '50 minutes',
        length: 1000 * 60 * 50,
        pattern: ['Step', 'Leap', 'Step', 'Leap']
      }

    ];

    return {
      options: options,
      selected: options[0]
    }
  });
})();
