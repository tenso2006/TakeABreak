(function() {
  const SETTINGS = angular.module('zen.settings', []);
  SETTINGS.controller('SettingsCtrl', function($scope, ZenSetting) {

    $scope.update = function (day, startTime, endTime, breakType) {
      ZenSetting.postSetting(day, startTime, endTime, breakType);
    };

    ZenSetting.getSetting()
    .then(function (data) {
        $scope.settingData = data;
        console.log('settingdata from controller ', $scope.settingData);
    });
  });
})();