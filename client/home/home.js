(function() {
  const HOME = angular.module('zen.home', []);
  HOME.controller('HomeCtrl', function($scope, $location, GetBreak, Timer, BroFactory) {
    $scope.break = {};
    $scope.brofix = BroFactory.getBro();
    $scope.timer = {
      time: Timer.getTime(),
      start: function() {
        Timer.start($scope.focus.selected.length);
        $scope.timer.active = true;
        setTimeout($scope.timer.getTime, 500);
      },
      pause: function() {
        $scope.timer.active = false;
      },
      reset: function() {
        Timer.reset($scope.focus.selected.length);
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
        {id: '1', focus: 'blue', text: '25 minutes', length: 1000 * 60 * 25},
        {id: '2', focus: 'white', text: '50 minutes', length: 1000 * 60 * 50}
      ],
      selected: {id: '1', focus: 'blue', text: '25 minutes', length: 1000 * 60 * 25}
    }

    $scope.updateTime = function() {
      console.log('hi');
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
      $.post('api/users/completion', { /*some user data*/ type: breakType }, function(resp, status, someObj) {
        console.log(resp) 
      })
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
