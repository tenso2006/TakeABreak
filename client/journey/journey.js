(function() {
  const JOURNEY = angular.module('zen.journey', ['chart.js']);
  JOURNEY.controller('JourneyCtrl', function($scope, $location, $window) {
    console.log($window)

    $scope.barchart = {
      labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
      data: [
        [5, 7, 10, 2, 4, 3, 2]
      ],
      options: {
        responsive: false,
        scales: {
          yAxes: [{ ticks: { min: 0 }}]
        }
      }
    };
  });
})();
