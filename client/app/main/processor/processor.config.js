'use strict';

import { PROCESSOR_WEIGHT } from '../apps.weight';

export default function($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.processor', {
      url: '/processors',
      views: {
        'content@app': {
          template: require('./processor.pug'),
          controller: 'ProcessorController as vm'
        }
      },
      resolve: {
        folders: apiResolver => apiResolver.resolve('mail.folders@query'),
        Labels: msApi => msApi.resolve('mail.labels@get')
      }
    })
    .state('app.processor.detail', {
      url: '/{id:[0-9a-f]{24}}'
    });

  // translation
  $translatePartialLoaderProvider.addPart('app/main/processor');

  // api
  msApiProvider.register('mail.labels', ['app/data/mail/labels.json']);

  // navigation
  msNavigationServiceProvider.saveItem('apps.processor', {
    title: 'Processing Unit',
    icon: 'icon-select-inverse',
    state: 'app.processor',
    translate: 'PROCESSOR.PROCESSOR_NAV',
    weight: PROCESSOR_WEIGHT
  });
}

/* vim:set sw=2 ts=2 sts=2: */
