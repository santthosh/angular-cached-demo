(function () {

  'use strict';

  angular.module('angularCachedDemo')

  .controller('MainCtrl', ['$scope', 'recentPostsService', 'localStorageService', function ($scope, recentPostsService, localStorageService) {
    var cachingEnabled = localStorageService.get('cachingEnabled'); // read it from cookie storage
    if(cachingEnabled == undefined) {
      localStorageService.add('cachingEnabled',$scope.cacheEnabled);
    }
    else {
      $scope.cacheEnabled = cachingEnabled;
    }

    $scope.initCache = function() {
    }

    $scope.toggleCache = function() {
      if($scope.cacheEnabled === 'NO') {
        localStorageService.clearAll();
      }
      localStorageService.add('cachingEnabled',$scope.cacheEnabled);
    }

    recentPostsService.getRecentPosts().then(function (data) {
       $scope.messages = data.response.messages.message;
    });

  }]);
}());
