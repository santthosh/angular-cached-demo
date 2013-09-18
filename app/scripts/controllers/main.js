(function () {

  'use strict';

  angular.module('angularCachedDemo')

  .controller('MainCtrl', ['$scope', 'recentPostsService',function ($scope, recentPostsService) {
    recentPostsService.getRecentPosts().then(function (data) {
       $scope.messages = data.response.messages.message;

    });

  }]);
}());
