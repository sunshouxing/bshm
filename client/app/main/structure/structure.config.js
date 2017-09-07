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
      url: '/bridge',
      views: {
        'content@app': {
          templateUrl: 'app/main/structure/bridge/bridge.pug',
          controller: 'BridgeController as vm'
        }
      }
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
