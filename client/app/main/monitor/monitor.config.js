'use strict';

import { MONITOR_WEIGHT } from '../apps.weight';

export default function($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.monitor', {
      url: '/monitor/:channel',
      views: {
        'content@app': {
          template: require('./monitor.pug'),
          controller: 'MonitorController as vm'
        }
      },
      resolve: {
        monitor: msApi => msApi.resolve('monitor.bridge@get')
      }
    });

  // api
  msApiProvider.register('monitor.bridge', ['app/data/monitor/monitor.json']);

  // translation
  $translatePartialLoaderProvider.addPart('app/main/monitor');

  // navigation
  msNavigationServiceProvider.saveItem('apps.monitor', {
    title: 'monitor',
    icon: 'icon-chart-areaspline',
    state: 'app.monitor',
    translate: 'monitor.MONITOR_NAV',
    weight: MONITOR_WEIGHT
  });
}

/* vim:set sw=2 ts=2 sts=2: */
