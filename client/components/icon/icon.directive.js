'use strict';

import angular from 'angular';

export default angular.module('bshmApp.icon', [])
  .directive('icon', function() {
    return {
      restrict: 'E',
      compile(element, attrs) {
        element.addClass('glyphicon');
        element.addClass(`glyphicon-${attrs.type}`);
      }
    };
  })
  .name;
