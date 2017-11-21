'use strict';

import { STRUCTURE_WEIGHT } from '../apps.weight';

export default function($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider.state('app.structure', {
    abstract: true,
    url: '/structure'
  });

  // translation
  $translatePartialLoaderProvider.addPart('app/main/structure');

  // navigations
  msNavigationServiceProvider.saveItem('apps.structure', {
    title: 'Structure',
    icon: 'icon-puzzle',
    translate: 'STRUCTURE.STRUCTURE_NAV',
    weight: STRUCTURE_WEIGHT
  });

  msNavigationServiceProvider.saveItem('apps.structure.bridge', {
    title: 'Bridge',
    translate: 'BRIDGE.BRIDGE_NAV',
    state: 'app.structure.bridge',
  });

  msNavigationServiceProvider.saveItem('apps.structure.section', {
    title: 'Section',
    translate: 'SECTION.SECTION_NAV',
    state: 'app.structure.section',
  });

  msNavigationServiceProvider.saveItem('apps.structure.sensor', {
    title: 'Sensor',
    translate: 'SENSOR.SENSOR_NAV',
    state: 'app.structure.sensor',
  });
}

/* vim:set sw=2 ts=2 sts=2: */
