(function() {
  const APP = angular.module('zen', [
    'zen.home',
    'zen.journey',
    'zen.login',
    'zen.services',
    'zen.settings',
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
      .when('/journey', {
        templateUrl: '/journey/journey.html',
        controller: 'JourneyCtrl'
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
