'use strict';

import { HOMEPAGE_WEIGHT } from '../apps.weight';

export default function($stateProvider, $stateParamsProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.homepage', {
      url: '/homepage/:bridge',
      views: {
        'content@app': {
          template: require('./homepage.pug'),
          controller: 'HomepageController as vm'
        }
      },
      resolve: {
        bridges: (msApi, $stateParams) => msApi.resolve(`overview.${$stateParams.bridge}@get`)
      }
    });

  // api
  msApiProvider.register('overview.baofu', ['app/data/overview/baofu.json']);
  msApiProvider.register('overview.nanlihe', ['app/data/overview/nanlihe.json']);

  // translation
  $translatePartialLoaderProvider.addPart('app/main/homepage');

  // navigation
  msNavigationServiceProvider.saveItem('baofu.homepage', {
    title: 'Homepage',
    icon: 'icon-home',
    state: 'app.homepage',
    stateParams: {bridge: 'baofu'},
    translate: 'HOMEPAGE.HOMEPAGE_NAV',
    weight: HOMEPAGE_WEIGHT
  });
  msNavigationServiceProvider.saveItem('nanlihe.homepage', {
    title: 'Homepage',
    icon: 'icon-home',
    state: 'app.homepage',
    stateParams: {bridge: 'nanlihe'},
    translate: 'HOMEPAGE.HOMEPAGE_NAV',
    weight: HOMEPAGE_WEIGHT
  });
}

/* vim:set sw=2 ts=2 sts=2: */
