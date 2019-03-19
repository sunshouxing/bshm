'use strict';

import { WARNING_WEIGHT } from '../apps.weight';

export default function($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.warning', {
      url: '/warning',
      views: {
        'content@app': {
          template: require('./warning.pug'),
          controller: 'WarningController as vm'
        }
      },
      resolve: {
        warnings: apiResolver => apiResolver.resolve('warnings@query')
      }
    });

  // translation
  $translatePartialLoaderProvider.addPart('app/main/warning');

  // navigation
  msNavigationServiceProvider.saveItem('baofu.warning', {
    title: 'Warning',
    icon: 'icon-alert-circle',
    state: 'app.warning',
    translate: 'WARNING.WARNING_NAV',
    weight: WARNING_WEIGHT
  });
  msNavigationServiceProvider.saveItem('nanlihe.warning', {
    title: 'Warning',
    icon: 'icon-alert-circle',
    state: 'app.warning',
    translate: 'WARNING.WARNING_NAV',
    weight: WARNING_WEIGHT
  });
}

/* vim:set sw=2 ts=2 sts=2: */
