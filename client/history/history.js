(function() {
  const HISTORY = angular.module('zen.history', ['chart.js']);
  HISTORY.controller('HistoryCtrl', function($scope, $location) {
    $scope.labels = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    $scope.data = [
      [5, 7, 10, 2, 4, 3, 2]
    ];
  });
})();
