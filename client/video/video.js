(function() {
  const VIDEO = angular.module('zen.video', []);

  VIDEO.controller('VideoCtrl', function($scope, $location, $window, GetBreak, Timer, VideoMain) {
    $scope.connected = false;
    $scope.start = VideoMain.start;
    $scope.join = function() {
      VideoMain.join();
      $scope.connected = true;
    }
    $scope.hangup = function() {
      VideoMain.hangup();
      $scope.connected = false;
    }
  });
})();
