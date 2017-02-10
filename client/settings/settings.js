(function() {
  const SETTINGS = angular.module('zen.settings', []);
  SETTINGS.controller('SettingsCtrl', function($http, $scope, $location, ZenSetting) {

    $scope.superButt = function (day, startTime, endTime, breakType) {
      console.log('UPDATE FIRING');
      ZenSetting.postSetting(day, startTime, endTime, breakType);

    };
  });
})();