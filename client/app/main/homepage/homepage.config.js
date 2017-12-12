'use strict';

import { HOMEPAGE_WEIGHT } from '../apps.weight';

export default function($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.homepage', {
      url: '/homepage',
      views: {
        'content@app': {
          template: require('./homepage.pug'),
          controller: 'HomepageController as vm'
        }
      }
    });

  // translation
  $translatePartialLoaderProvider.addPart('app/main/homepage');

  // navigation
  msNavigationServiceProvider.saveItem('apps.homepage', {
    title: 'Homepage',
    icon: 'icon-home',
    state: 'app.homepage',
    translate: 'HOMEPAGE.HOMEPAGE_NAV',
    weight: HOMEPAGE_WEIGHT
  });
}

/* vim:set sw=2 ts=2 sts=2: */
