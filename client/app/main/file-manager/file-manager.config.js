'use strict';

import { FILE_MANAGER_WEIGHT } from '../apps.weight';

export default function($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider, msApiProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.file-manager', {
      url: '/file-manager',
      views: {
        'content@app': {
          template: require('./file-manager.pug'),
          controller: 'FileManagerController as vm'
        }
      },
      resolve: {
        documents: msApi => msApi.resolve('fileManager.documents@get')
      }
    });

  // translation
  $translatePartialLoaderProvider.addPart('app/main/file-manager');

  // navigation
  msNavigationServiceProvider.saveItem('apps.file-manager', {
    title: 'File Manager',
    icon: 'icon-folder',
    state: 'app.file-manager',
    //translate: 'SAMPLE.SAMPLE_NAV',
    weight: FILE_MANAGER_WEIGHT
  });

  // api
  msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);
}

/* vim:set sw=2 ts=2 sts=2: */