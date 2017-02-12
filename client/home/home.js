(function() {
  const HOME = angular.module('zen.home', []);

  HOME.controller('HomeCtrl', function($scope, $location, $window, Api, Timer, Masters, Focus, Break) {
    $scope.break = Break;

    $scope.masters = Masters;
    $scope.masters.getPattern = getPattern;

    $scope.focus = Focus;
    $scope.focus.getPattern = getPattern;

    $scope.videoSource = function() {
      return `<iframe id="youtube" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/${youtubeURL()}?enablejsapi=1" allowFullScreen></iframe>`
    }

    $scope.timer = {
      time: $scope.focus.selected.length,
      endTime: 0,
      start: function() {
        if ($scope.timer.time > 500) {
          $scope.timer.endTime = Timer.now() + $scope.timer.time;
          $scope.timer.active = true;
          toggleDisabled('timer-pause', false);
          toggleDisabled('timer-start', true);
          setTimeout($scope.timer.getTime, 500);
        }
      },
      pause: function() {
        $scope.timer.active = false;
        toggleDisabled('timer-pause', true);
        toggleDisabled('timer-start', false);
      },
      reset: function() {
        $scope.timer.pause();
        $scope.break.onBreak = false;
        toggleDisabled('timer-start', false);
        $scope.timer.time = $scope.focus.selected.length;
      },
      getTime: function() {
        if ($scope.timer.time <= 500) {
          $scope.timer.active = false;
          toggleDisabled('timer-pause', true);
          $scope.getBreak();
          $scope.$apply();
        }
        if ($scope.timer.active) {
          $scope.timer.time = $scope.timer.endTime - Timer.now();
          $scope.$apply();
          setTimeout($scope.timer.getTime, 500);
        }
      },
      displayTime: function() {
        return Timer.formatTime($scope.timer.time);
      },
      active: false
    };

    $scope.wave = {
      interval: 0,
      imgSource: function(id) {
        if (id !== $scope.wave.interval) return 'wave.png';
        if ($scope.timer.time < 500) return 'surfer-0.png';
        var interval = Math.ceil(($scope.timer.time) / ($scope.focus.selected.length / 3));
        return 'surfer-' + interval + '.png';
      }
    };

    $scope.getBreak = function() {
      Api.getBreak({
        length: $scope.focus.getPattern(), //Step or Leap
        type: $scope.masters.getPattern()  //Mental or Physical
      })
      .then(function(data) {
        $scope.break.type = data.type;
        $scope.break.title = data.title;
        $scope.break.audio = data.audio;
        $scope.break.video = data.video;
        $scope.break.description = data.description;
        $scope.break.onBreak = true;
      });
    }

    $scope.completeBreak = function() {
      $scope.timer.reset();
      $scope.timer.start();
      $scope.toggleAudio('pause');
      $scope.wave.interval = ($scope.wave.interval + 1) % 4;
      $.post('api/users/completion', {
        email: JSON.parse($window.localStorage.user).email,
        type: $scope.break.type
      });
    };

    $scope.skipBreak = function() {
      $scope.timer.reset();
      $scope.wave.interval = ($scope.wave.interval + 1) % 4;
      $scope.timer.start();
    };

    $scope.toggleAudio = function(command) {
      toggleDisabled('audio-play', command === 'play');
      toggleDisabled('audio-pause', command === 'pause');
      $('#youtube')[0].contentWindow.postMessage('{"event":"command","func":"' + command + 'Video","args":""}', '*');
    };

    function getPattern() {
      return this.selected.pattern[$scope.wave.interval];
    }

    function youtubeURL() {
      return $scope.break.hasAudio() ? $scope.break.audio : $scope.break.video;
    }

    function toggleDisabled(id, bool) {
      document.getElementById(id).disabled = bool;
    }
  });

  HOME.filter('trustedhtml', function($sce) {
    return $sce.trustAsHtml;
  });
})();
