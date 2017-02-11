(function() {
  const HOME = angular.module('zen.home', []);

  HOME.controller('HomeCtrl', function($scope, $location, $window, GetBreak, Timer) {
    $scope.break = {
      onBreak: false
    };

    $scope.masters = {
      options: [
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
      ],
    }
    $scope.masters.selected = $scope.masters.options[1];

    $scope.focus = {
      options: [
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
      ],
    }
    $scope.focus.selected = $scope.focus.options[0];

    $scope.timer = {
      time: $scope.focus.selected.length,
      endTime: 0,
      start: function() {
        $scope.timer.endTime = Timer.now() + $scope.timer.time;
        $scope.timer.active = true;
        setTimeout($scope.timer.getTime, 500);
      },
      pause: function() {
        $scope.timer.active = false;
      },
      reset: function() {
        $scope.timer.pause();
        $scope.break.onBreak = false;
        $scope.timer.time = $scope.focus.selected.length;
      },
      getTime: function() {
        if ($scope.timer.time <= 500) {
          $scope.timer.active = false;
          $scope.break.onBreak = true;
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

    GetBreak.get().then(function(data) {
      // console.log('Home.js - Get a Break: ', data);
      $scope.break.type = data.type;
      $scope.break.title = data.title;
      $scope.break.description = data.description;
    });

    $scope.completeBreak = function() {
      $scope.timer.reset();
      $scope.wave.interval = ($scope.wave.interval + 1) % 4;
      $.post('api/users/completion', { email: JSON.parse($window.localStorage.user).email, type: $scope.break.type }, function(resp, status, someObj) {
        console.log(resp)
      });
    };

    $scope.skipBreak = function() {
      console.log('skipped');
    };

  });
})();
