(function () {
  'use strict';

  angular.module('angularCachedDemo', ['LocalStorageModule','DeferredUpdateModule','LoadingModule','recentPostsService','ngResource','ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);
}());
