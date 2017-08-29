'use strict';

export default function($stateProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.file-manager', {
      url: '/file-manager',
      views: {
        'content@app': {
          template: "<file-manager></file-manager>"
        }
      }
    });

  // navigation
  msNavigationServiceProvider.saveItem('apps', {
    title: 'APPS',
    group: true,
    weight: 1
  });

  msNavigationServiceProvider.saveItem('apps.file-manager', {
    title: 'File Manager',
    icon: 'icon-folder',
    state: 'app.file-manager',
    //translate: 'SAMPLE.SAMPLE_NAV',
    weight: 1
  });

}
