(function() {
  const APP = angular.module('zen', [
    'zen.home',
    'zen.history',
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
        templateUrl: '/login/login.html'
        //TODO: controller
      })
      .when('/history', {
        templateUrl: '/history/history.html',
        controller: 'HistoryCtrl'
      })
      .otherwise({
        templateUrl: '/login',
      });


      $locationProvider.hashPrefix('');
  });
})();
