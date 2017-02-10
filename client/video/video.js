(function() {
  const VIDEO = angular.module('zen.video', []);

  VIDEO.controller('VideoCtrl', function($scope, $location, $window, GetBreak, Timer, VideoHelpers) {
    $scope.start = VideoHelpers.start;
    $scope.call = VideoHelpers.call;
    $scope.hangup = VideoHelpers.hangup;
  });
})();
