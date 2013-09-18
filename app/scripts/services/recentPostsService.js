(function () {

  'use strict';

  angular.module('recentPostsService', ['LocalStorageModule','DeferredUpdateModule','ngResource'])

    .factory('recentPostsService', ['$resource', 'localStorageService','deferredUpdateService', function ($resource, localStorageService, deferredUpdateService) {
      return {
        getRecentPosts: function () {
          var posts, request, deferred, promise;

          deferred = deferredUpdateService.defer();
          promise = deferred.promise;

          posts = $resource('http://lithosphere.lithium.com/restapi/vc/posts/recent?restapi.response_format=json&restapi.response_style=-types,-null',{callback: 'JSON_CALLBACK'},
            {
              get: { method: 'JSONP'}
            });

          request = {};

          posts.get(request, function (response) {
            localStorageService.add('recent',response);
            deferred.resolve(response);
          });

          deferred.resolve(localStorageService.get('recent'));

          return promise;
        }
      };
    }]);

}());