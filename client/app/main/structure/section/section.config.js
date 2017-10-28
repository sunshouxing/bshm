'use strict';

export default function($stateProvider, $translatePartialLoaderProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.structure.section', {
      url: '/sections',
      views: {
        'content@app': {
          template: require('./section.pug'),
          controller: 'SectionController as vm'
        }
      }
    })
    .state('app.structure.section.detail', {
      url: '/{id:[0-9a-f]{24}}',
    });

  // translation
  $translatePartialLoaderProvider.addPart('app/main/structure/section');
}

/* vim:set sw=2 ts=2 sts=2: */
