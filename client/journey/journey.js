(function() {
  const JOURNEY = angular.module('zen.journey', ['chart.js']);
  JOURNEY.controller('JourneyCtrl', function($scope, $location, $window) {
    $scope.barchart = {
      labels: [],
      data: [],
      options: {
                  responsive: true,
                  scales: {
                  yAxes: [{ ticks: { min: 0 }}]
                }
      }
    };

    $.get({
      url: '/api/users/journey',
      headers: { user: $window.localStorage.user }
    })
    .then(function(data) {
      $scope.data = data;
      $scope.barchart.labels = [
                                $scope.data[0].date,
                                $scope.data[1].date,
                                $scope.data[2].date,
                                $scope.data[3].date,
                                $scope.data[4].date,
                                $scope.data[5].date,
                                $scope.data[6].date
                              ];
      $scope.barchart.data = [[
                                $scope.data[0].reps,
                                $scope.data[1].reps,
                                $scope.data[2].reps,
                                $scope.data[3].reps,
                                $scope.data[4].reps,
                                $scope.data[5].reps,
                                $scope.data[6].reps
                              ]];
      });
    });
})();
