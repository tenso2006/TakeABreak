(function() {
  const HOME = angular.module('zen.home', []);
  HOME.controller('HomeCtrl', function($scope, $location, GetBreak, Timer) {
    $scope.break = {};

    $scope.masters = {
      options: [
        {id: '1', guru: 'Master Mind', text: '...inner-focused'},
        {id: '2', guru: 'Master Mix', text: '...a nice balance'},
        {id: '3', guru: 'Master Move', text: '...body-focused'}
      ],
      selected: {id: '2', guru: 'Master Mix', text: '...a nice balance'}
    }

    $scope.focus = {
      options: [
        {id: '1', focus: 'blue', text: '25 minutes', length: 1000 * 10 * 1},
        {id: '2', focus: 'white', text: '50 minutes', length: 1000 * 60 * 50}
      ],
      selected: {id: '1', focus: 'blue', text: '25 minutes', length: 1000 * 10 * 1}
    }

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
        $scope.timer.time = $scope.focus.selected.length;
      },
      getTime: function() {
        if ($scope.timer.time <= 500) {
          $scope.timer.active = false;
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
      getSource: function(id) {
        if (id !== $scope.wave.interval) return 'wave.png';
        if ($scope.timer.time < 500) return 'surfer-0.png';
        var interval = Math.ceil(($scope.timer.time) / ($scope.focus.selected.length / 3));
        return 'surfer-' + interval + '.png';
      }
    };

    GetBreak.get().then(function(Break) {
      console.log('Home.js - Get a Break: ', Break);
      $scope.break.type = Break.type;
      $scope.break.title = Break.title;
      $scope.break.description = Break.description;
    });

    $scope.completeBreak = function() {
      $scope.timer.reset();
      $scope.wave.interval = ($scope.wave.interval + 1) % 4;

      $.post('api/users/completion', { /*some user data*/ type: $scope.break.type }, function(resp, status, someObj) {
        console.log(resp)
      });
    };

    $scope.skipBreak = function() {
      console.log('skipped');
    };

  });
})();
