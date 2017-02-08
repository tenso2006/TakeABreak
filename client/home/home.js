(function() {
  const HOME = angular.module('zen.home', []);
  HOME.controller('HomeCtrl', function($scope, $location, GetBreak, Timer) {
    $scope.break = {};
    $scope.timer = {
      time: Timer.getTime(),
      start: function() {
        Timer.start();
        $scope.timer.active = true;
        setTimeout($scope.timer.getTime, 500);
      },
      pause: function() {
        $scope.timer.active = false;
      },
      reset: function() {
        Timer.reset();
        $scope.timer.pause();
        $scope.timer.time = Timer.getTime($scope.timer.active);
      },
      getTime: function() {
        $scope.timer.time = Timer.getTime($scope.timer.active);
        $scope.$apply();
        if ($scope.timer.active) {
          setTimeout($scope.timer.getTime, 500);
        }
      },
      active: false
    };

    $scope.getTime = function() {
      $scope.timer.time = Timer.time;
    }

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
