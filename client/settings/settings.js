(function() {
  const SETTINGS = angular.module('zen.settings', []);
  SETTINGS.controller('SettingsCtrl', function($http, $scope, $location, Api) {

    $scope.superButt = function (day, startTime, endTime, breakType) {
      console.log('UPDATE FIRING');
      Api.postSetting(day, startTime, endTime, breakType);

    };
  });
})();
