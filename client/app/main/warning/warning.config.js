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
        documents: apiResolver => apiResolver.resolve('files@query')
      }
    });

  // translation
  $translatePartialLoaderProvider.addPart('app/main/warning');

  // navigation
  msNavigationServiceProvider.saveItem('apps.warning', {
    title: 'File Manager',
    icon: 'icon-warn',
    state: 'app.warning',
    translate: 'WARNING.FILE_MANAGER_NAV',
    weight: WARNING_WEIGHT
  });
}

/* vim:set sw=2 ts=2 sts=2: */
