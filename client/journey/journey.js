(function() {
  const JOURNEY = angular.module('zen.journey', ['chart.js']);
  JOURNEY.controller('JourneyCtrl', function($scope, $location, $window, $timeout) {
    $scope.barchart = {
      labels: ['Your journey is yet to begin!'],
      data: [[0]],
      options: {
        gridLines: {
          display: false
        },
        responsive: true,
        scales: {
          yAxes: [{ ticks: { min: 0 }}]
        },
      }
    };

    $.get({
      url: '/api/users/journey',
      headers: { user: $window.localStorage.user }
    })
    .then(function(data) {
      console.log(arguments)
      $scope.barchart.labels = [];
      var labelReference = [];
      var innerData = [];

      var countDayBackwards = function(dateNum) {
        var year = Math.floor(dateNum / 10000); 
        var monthDate = (dateNum % 10000) - 1;
        if (monthDate > 131 && monthDate < 201) {
          monthDate = 131;
        } else if (monthDate > 228 && monthDate < 301) {
          monthDate = 228;
        } else if (monthDate > 331 && monthDate < 401) {
          monthDate = 331;
        } else if (monthDate > 430 && monthDate < 501) {
          monthDate = 430;
        } else if (monthDate > 531 && monthDate < 601) {
          monthDate = 531;
        } else if (monthDate > 630 && monthDate < 701) {
          monthDate = 630;
        } else if (monthDate > 731 && monthDate < 801) {
          monthDate = 731;
        } else if (monthDate > 831 && monthDate < 901) {
          monthDate = 831;
        } else if (monthDate > 930 && monthDate < 1001) {
          monthDate = 930;
        } else if (monthDate > 1031 && monthDate < 1101) {
          monthDate = 1031;
        } else if (monthDate > 1130 && monthDate < 1201) {
          monthDate = 1130;
        }

        if (monthDate.toString().length === 3) { monthDate = '' + 0 + monthDate; }

        return '' + year + monthDate;
      };

      var findReps = function(dateNum) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].date == dateNum) { return data[i].reps; }
        }
      };

      var recentDate = data[data.length - 1].date;
      labelReference.unshift(recentDate);
      var currentDate = recentDate;

      while (labelReference.length < 7) {
        currentDate = countDayBackwards(currentDate);
        labelReference.unshift(currentDate);
      }

      for (let i = 0; i < labelReference.length; i++) {
        $scope.barchart.labels.push(labelReference[i].slice(4, 6)  + '/' + labelReference[i].slice(6));
        var reps = findReps(labelReference[i]);
        if (!reps) { 
          innerData.push(0); 
        } else {
          innerData.push(reps);
        }
      }

      $scope.barchart.data.push(innerData);
      $timeout(function() {}, 0); //makes this bullshit render
    });
  });
})();
