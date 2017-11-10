'use strict';

import angular from 'angular';

export default angular.module('bshm.directives', [])
  .directive('mdAutocompleteIcon', function($timeout, $compile) {
    'ngInject';

    return {
      restrict: 'A',
      link(scope, element, attributes) {
        $timeout(() => {
          let container = angular.element(element[0].querySelector('md-input-container'));
          let icon = $compile(`<md-icon md-font-icon='${attributes[this.name]}'></md-icon>`)(scope);
          container.addClass('md-icon-left');
          container.append(icon);
        });
      }
    };
  })
  .name;
