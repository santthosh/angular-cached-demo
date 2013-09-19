(function () {

  'use strict';

  angular.module('recentPostsService', ['LocalStorageModule','DeferredUpdateModule','ngResource'])

    .factory('recentPostsService', ['$rootScope','$resource', 'localStorageService','deferredUpdateService', function ($rootScope, $resource, localStorageService, deferredUpdateService) {
      return {
        getRecentPosts: function () {
          var posts, request, deferred, promise;

          var cachingEnabled = localStorageService.get('cachingEnabled');
          if(cachingEnabled === undefined) {
            cachingEnabled = 'YES';
          }

          deferred = deferredUpdateService.defer();
          promise = deferred.promise;

          posts = $resource('http://lithosphere.lithium.com/restapi/vc/posts/recent?restapi.response_format=json&restapi.response_style=-types,-null',{callback: 'JSON_CALLBACK'},
            {
              get: { method: 'JSONP'}
            });

          request = {};

          $rootScope.loading = true;
          posts.get(request, function (response) {
            if(cachingEnabled === 'YES') {
              localStorageService.add('recent',response);       // here is where we add the server response to local storage
            }
            deferred.resolve(response);
            $rootScope.loading = false;
          });

          if(cachingEnabled === 'YES') {
            var response = localStorageService.get('recent');
            if(response != undefined)  {
              deferred.resolve(response);                       // this is the deferred update magic, we use cached value from
            }                                                   // local storage to present data
          }

          return promise;
        }
      };
    }]);

}());