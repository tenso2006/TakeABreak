var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider, $locationProvider) {
  console.log($routeProvider, $locationProvider)
  $routeProvider
    .when('/', {
      controller: 'home',
      templateUrl: '/home/home.html',
      reloadOnSearch: false,
      authorize: true
    })
    .when('/login', {
      //TODO: controller
      templateUrl: '/login/login.html'
    })
    .when('/history', {
      controller: 'historyController',
      templateUrl: '/history/history.html',
      authorize: true
    })
    .otherwise({
      redirectTo: '/login',
    });
    $locationProvider.hashPrefix('');
});