(function() {
  const AUTH = angular.module('zen.auth', []);

  AUTH.factory('Auth', function ($location, $window) {

    var isAuth = function () {
      var token = $window.localStorage.getItem('com.zen');
      return !!token;
    };

    var signout = function () {
      $window.localStorage.removeItem('com.zen');
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      $location.path('/');
    };

    return {
      isAuth: isAuth,
      signout: signout
    };
  });
})();
