(function() {
  const SETTINGS = angular.module('zen.settings', []);
  SETTINGS.controller('SettingsCtrl', function($scope, $location, ZenSetting) {
    $scope.zenSetting = {};

    $scope.update = function (setting) {

    };
  });
})();