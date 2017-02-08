(function() {
  const HOME = angular.module('zen.home', []);
  HOME.controller('HomeCtrl', function($scope, $location, GetBreak, Timer, BroFactory) {
    $scope.break = {};
    $scope.brofix = BroFactory.getBro();

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
        console.log($scope.wave.getSource());
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
      getSource: function() {
        if ($scope.timer.time < 500) return 'surfer-0.png';
        var interval = Math.ceil(($scope.timer.time) / ($scope.focus.selected.length / 3));
        return 'surfer-' + interval + '.png';
      }
    };

    // $scope.physicalBreakCount = {Yes: 0, No: 0};
    // $scope.mentalBreakCount = {Yes: 0, No: 0};
    // $scope.physicalPercent = {Yes: 0, No: 0};
    // $scope.mentalPercent = {Yes: 0, No: 0};
    // $scope.physicalPercentString = $scope.physicalPercent.Yes;
    // $scope.mentalPercentString = $scope.mentalPercent.Yes;

    GetBreak.get().then(function(Break) {
      console.log('Home.js - Get a Break: ', Break);
      $scope.break.type = Break.type;
      $scope.break.title = Break.title;
      $scope.break.description = Break.description;
    });

    $scope.completeBreak = function(breakType) {
      breakType = $scope.break.type;
      console.log('Type of Break is: ', breakType);
      // if (breakType === 'Physical') {
      //   $scope.physicalBreakCount.Yes++;

      //   $scope.physicalPercent.Yes =
      //   Math.round(($scope.physicalBreakCount.Yes / ($scope.physicalBreakCount.Yes +
      //     $scope.physicalBreakCount.No)) * 100);

      //   $scope.physicalPercent.No = 100 - $scope.physicalPercent.Yes;
      //   document.getElementById("physical-yes").style.width = $scope.physicalPercent.Yes.toString() + '%';
      //   document.getElementById("physical-no").style.width = $scope.physicalPercent.No.toString() + '%';
      //   getABreak();
      // } else {
      //   $scope.mentalBreakCount.Yes++;
      //   $scope.mentalPercent.Yes =

      //   Math.round(($scope.mentalBreakCount.Yes / ($scope.mentalBreakCount.Yes +
      //     $scope.mentalBreakCount.No)) * 100);

      //   $scope.mentalPercent.No = 100 - $scope.mentalPercent.Yes;
      //   document.getElementById("mental-yes").style.width = $scope.mentalPercent.Yes.toString() + '%';
      //   document.getElementById("mental-no").style.width = $scope.mentalPercent.No.toString() + '%';
      //   getABreak();
      // }
    };

    $scope.notCompleteBreak = function(breakType) {
      breakType = $scope.break.type;
      if (breakType === 'Physical') {
        $scope.physicalBreakCount.No++;

         $scope.physicalPercent.No =
        Math.round(($scope.physicalBreakCount.No / ($scope.physicalBreakCount.Yes +
          $scope.physicalBreakCount.No)) * 100);

        $scope.physicalPercent.Yes = 100 - $scope.physicalPercent.No;
        document.getElementById("physical-yes").style.width = $scope.physicalPercent.Yes.toString() + '%';
        document.getElementById("physical-no").style.width = $scope.physicalPercent.No.toString() + '%';
        getABreak();
      } else {
        $scope.mentalBreakCount.No++;
         $scope.mentalPercent.No =

        Math.round(($scope.mentalBreakCount.No / ($scope.mentalBreakCount.Yes +
          $scope.mentalBreakCount.No)) * 100);

        $scope.mentalPercent.Yes = 100 - $scope.mentalPercent.No;
        document.getElementById("mental-yes").style.width = $scope.mentalPercent.Yes.toString() + '%';
        document.getElementById("mental-no").style.width = $scope.mentalPercent.No.toString() + '%';
        getABreak();
      }
    };

  });
})();






    // console.log(aBreak.getBreak());
