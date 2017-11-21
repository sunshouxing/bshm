'use strict';

export default function($translatePartialLoaderProvider, msNavigationServiceProvider) {
  'ngInject';

  // translation
  $translatePartialLoaderProvider.addPart('app/main');

  // register apps navigation group
  msNavigationServiceProvider.saveItem('apps', {
    title: 'APPS',
    group: true,
    translate: 'MAIN.APPS_NAV',
    weight: 1
  });
}

/* vim:set sw=2 ts=2 sts=2: */
