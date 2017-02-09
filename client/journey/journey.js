(function() {
  const JOURNEY = angular.module('zen.journey', ['chart.js']);
  JOURNEY.controller('JourneyCtrl', function($scope, $location) {
    $scope.labels = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    $scope.data = [
      [5, 7, 10, 2, 4, 3, 2]
    ];
  });
})();
