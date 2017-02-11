(function() {
  const VIDEO = angular.module('zen.video', []);

  VIDEO.controller('VideoCtrl', function($scope, VideoMain) {
    $scope.start = VideoMain.start;
    $scope.join = VideoMain.join;
    $scope.hangup = VideoMain.hangup;
  });
})();
