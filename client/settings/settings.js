(function() {
  const SETTINGS = angular.module('zen.settings', []);
  SETTINGS.controller('SettingsCtrl', function($http, $scope, $location, ZenSetting) {
    $scope.update = function (day, startTime, endTime, breakType) {
      ZenSetting.postSetting(day, startTime, endTime, breakType);
    };
  });
})();