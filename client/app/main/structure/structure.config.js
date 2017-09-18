'use strict';

import { STRUCTURE_WEIGHT } from '../apps.weight';

export default function($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.structure', {
      abstract: true,
      url: '/structure'
    })
    .state('app.structure.bridge', {
      url: '/bridges',
      views: {
        'content@app': {
          template: require('./bridge/bridge.pug'),
          controller: 'BridgeController as vm'
        }
      },
      resolve: {
        folders: apiResolver => apiResolver.resolve('mail.folders@query'),
        Labels: msApi => msApi.resolve('mail.labels@get')
      }
    })
    .state('app.structure.bridge.detail', {
      url: '/{id:[0-9a-f]{24}}',
    });


  // navigations
  msNavigationServiceProvider.saveItem('apps.structure', {
    title: 'Structure',
    icon: 'icon-puzzle',
    weight: STRUCTURE_WEIGHT
  });

  msNavigationServiceProvider.saveItem('apps.structure.bridge', {
    title: 'Bridge',
    state: 'app.structure.bridge',
  });
}

/* vim:set sw=2 ts=2 sts=2: */
