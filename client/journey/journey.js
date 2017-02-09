(function() {
  const JOURNEY = angular.module('zen.journey', ['chart.js']);
  JOURNEY.controller('JourneyCtrl', function($scope, $location, $window) {
    $.get({
      url: '/api/users/journey',
      headers: { user: $window.localStorage.user }
    })
    .then(function(data) {
      $scope.data = data;
      $scope.barchart = {
        labels: [ 
                  $scope.data[0].date, 
                  $scope.data[1].date,
                  $scope.data[2].date,
                  $scope.data[3].date,
                  $scope.data[4].date,
                  $scope.data[5].date,
                  $scope.data[6].date
                ],
        data: [
                [ 
                  $scope.data[0].reps,
                  $scope.data[1].reps,
                  $scope.data[2].reps,
                  $scope.data[3].reps,
                  $scope.data[4].reps,
                  $scope.data[5].reps,
                  $scope.data[6].reps
                ]
              ],
        options: {
          responsive: true,
          allowDecimals: false,
          scales: {
            yAxes: [{ ticks: { min: 0 }}]
          }
        }
      };
    })
  });
})();
