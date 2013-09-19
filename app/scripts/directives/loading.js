(function () {
  'use strict';

  angular.module('LoadingModule', [])

    .directive('loading', function () {
      return {
        restrict: 'A',
        link: function (scope, element) {
          scope.$watch('loading', function (val) {
            if (val)
              element.html('<div class="loading-indicator">&nbsp;</div>');
            else
              element.html('');
          });
        }
      }
    })
}())
