'use strict';

export default function($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.structure.bridge', {
      url: '/bridges',
      views: {
        'content@app': {
          template: require('./bridge.pug'),
          controller: 'BridgeController as vm'
        }
      },
      resolve: {
        folders: apiResolver => apiResolver.resolve('mail.folders@query'),
        Labels: msApi => msApi.resolve('mail.labels@get')
      }
    })
    .state('app.structure.bridge.detail', {
      url: '/{id:[0-9a-f]{24}}'
    });

  // translation
  $translatePartialLoaderProvider.addPart('app/main/structure/bridge');

  // api
  msApiProvider.register('mail.labels', ['app/data/mail/labels.json']);
}

/* vim:set sw=2 ts=2 sts=2: */
