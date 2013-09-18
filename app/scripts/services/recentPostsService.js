(function () {

  'use strict';

  angular.module('recentPostsService', ['ngResource'])

    .factory('recentPostsService', ['$resource', '$q', function ($resource, $q) {
      return {
        getRecentPosts: function () {
          var posts, request, deferred, promise;

          deferred = $q.defer();
          promise = deferred.promise;

          posts = $resource('http://lithosphere.lithium.com/restapi/vc/posts/recent?restapi.response_format=json&restapi.response_style=-types,-null');

          request = {};

          posts.get(request, function (response) {
            deferred.resolve(response);
          });

          return promise;
        }
      };
    }]);

}());