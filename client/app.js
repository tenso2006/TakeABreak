(function() {
  const APP = angular.module('zen', [
    'zen.home',
    'zen.history',
    'zen.login',
    'zen.services',
    'ngRoute'
  ]);

  APP.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: '/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/history', {
        templateUrl: '/history/history.html',
        controller: 'HistoryCtrl'
      })
      .when('/settings', {
        templateUrl: '/settings/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/login',
      });


      $locationProvider.hashPrefix('');
  });
})();
