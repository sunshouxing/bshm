'use strict';

export default function($translatePartialLoaderProvider, msNavigationServiceProvider) {
  'ngInject';

  // translation
  $translatePartialLoaderProvider.addPart('app/main');

  // register apps navigation group
  msNavigationServiceProvider.saveItem('baofu', {
    title: 'APPS',
    group: true,
    translate: 'MAIN.BAOFU_NAV',
    weight: 1
  });
  msNavigationServiceProvider.saveItem('nanlihe', {
    title: 'APPS',
    group: true,
    translate: 'MAIN.NANLIHE_NAV',
    weight: 1
  });
}

/* vim:set sw=2 ts=2 sts=2: */
