'use strict';

import { STRUCTURE_WEIGHT } from '../apps.weight';

export default function($stateProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider.state('app.structure', {
    abstract: true,
    url: '/structure'
  });

  // navigations
  msNavigationServiceProvider.saveItem('apps.structure', {
    title: 'Structure',
    icon: 'icon-puzzle',
    weight: STRUCTURE_WEIGHT
  });

  msNavigationServiceProvider.saveItem('apps.structure.bridge', {
    title: 'Bridge',
    state: 'app.structure.bridge',
  });

  msNavigationServiceProvider.saveItem('apps.structure.section', {
    title: 'Section',
    state: 'app.structure.section',
  });

  msNavigationServiceProvider.saveItem('apps.structure.sensor', {
    title: 'Sensor',
    state: 'app.structure.sensor',
  });
}

/* vim:set sw=2 ts=2 sts=2: */
