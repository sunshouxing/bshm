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
      abstract: true,
      url: '/bridge',
      views: {
        'content@app': {
          template: require('./bridge/bridge.pug'),
          controller: 'BridgeController as vm'
        }
      },
      resolve: {
        Folders: msApi => msApi.resolve('mail.folders@get'),
        Labels: msApi => msApi.resolve('mail.labels@get')
      }
    })
    .state('app.structure.bridge.list', {
      url: '/list',
      views: {
        'bridge@app.structure.bridge': {
          template: require('./bridge/views/list/list.pug')
        }
      }
    })
    .state('app.structure.bridge.detail', {
      url: '/{id:[0-9a-f]{19}}',
      views: {
        'bridge@app.structure.bridge': {
          template: require('./bridge/views/detail/detail.pug'),
          controller: 'BridgeDetailController as vm'
        }
      },
      resolve: {
        bridge: msApi => msApi.resolve('mail.folder.inbox@get')
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
    state: 'app.structure.bridge.list',
  });
}

/* vim:set sw=2 ts=2 sts=2: */
