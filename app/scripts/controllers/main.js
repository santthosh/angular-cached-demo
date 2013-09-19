(function () {

  'use strict';

  angular.module('angularCachedDemo')

  .controller('MainCtrl', ['$scope', 'recentPostsService', 'localStorageService', function ($scope, recentPostsService, localStorageService) {
    $scope.initCache = function() {                                   // initialize the toggle button state
      var cachingEnabled = localStorageService.get('cachingEnabled'); // read it from storage
      if(cachingEnabled == undefined) {                               // if not already set
        localStorageService.add('cachingEnabled',$scope.cacheEnabled);//  store defaults into local storage
      }
      else {
        $scope.cacheEnabled = cachingEnabled;                         // if set, use that
      }
    }

    $scope.toggleCache = function() {
      if($scope.cacheEnabled === 'NO') {
        localStorageService.clearAll();                               // clear the local storage just to be sure
      }
      localStorageService.add('cachingEnabled',$scope.cacheEnabled);  // toggle the storage value appropriately
    }

    $scope.cacheSupport = function() {
      return !localStorageService.isSupported();                       // this demo does not work if local storage is not supported
    }

    recentPostsService.getRecentPosts().then(function (data) {
       $scope.messages = data.response.messages.message;
    });

  }]);
}());
