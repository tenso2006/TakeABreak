(function() {
  const SETTINGS = angular.module('zen.settings', []);
  SETTINGS.controller('SettingsCtrl', function($scope, ZenSetting) {
    $scope.update = function (day, startTime, endTime, breakType) {
      ZenSetting.postSetting(day, startTime, endTime, breakType);
    };
    $scope.mode = ['edit', 'view'];
    $scope.selection = $scope.mode[0];
  });
})();