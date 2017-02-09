(function() {
  const AUTH = angular.module('zen.auth', []);

  AUTH.factory('Auth', function ($location, $window) {

    var isAuth = function () {
      var token = $window.localStorage.getItem('com.zen');
      return !!token;
    };

    var signout = function () {
      $window.localStorage.removeItem('com.zen');
      $location.path('/signin');
    };

    return {
      isAuth: isAuth,
      signout: signout
    };
  });
})();
