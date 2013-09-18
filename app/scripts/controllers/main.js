(function () {

  'use strict';

  angular.module('angularCachedDemo')

  .controller('MainCtrl', ['$scope', 'recentPostsService',function ($scope, recentPostsService) {
    $scope.messages = ['hello'];

    recentPostsService.getRecentPosts().then(function (data) {
      console.log(data);
       $scope.messages = data.response.messages.message;

    });

  }]);
}());
