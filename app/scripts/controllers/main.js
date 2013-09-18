(function () {

  'use strict';

  angular.module('angularCachedDemo')

  .controller('MainCtrl', ['$scope', 'recentPostsService',function ($scope, recentPostsService) {
    $scope.messages = ['hello'];

    console.log($scope.messages);

    recentPostsService.getRecentPosts().then(function (data) {
       $scope.messages = data.response.messages.message;
    });

  }]);
}());
