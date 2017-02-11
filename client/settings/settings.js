(function() {
  const SETTINGS = angular.module('zen.settings', []);

  SETTINGS.controller('SettingsCtrl', function($scope, Api) {

    $scope.update = function (day, startTime, endTime, breakType) {
      Api.postSetting(day, startTime, endTime, breakType);
    };

    Api.getSetting().then(function (data) {
      $scope.settingData = data;
      console.log('settingdata from controller ', $scope.settingData);
    });
  });
})();
