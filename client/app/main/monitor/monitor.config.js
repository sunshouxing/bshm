'use strict';

import { MONITOR_WEIGHT } from '../apps.weight';

export default function($stateProvider, $stateParamsProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.monitor', {
      url: '/monitor',
      views: {
        'content@app': {
          template: require('./monitor.pug'),
          controller: 'MonitorController as vm'
        }
      },
      resolve: {
        thresholds: msApi => msApi.resolve('warning.thresholds@get')
      }
    })
    .state('app.monitor.sensor', {
      url: '/sensor/:sensorName',
      views: {
        'module@app.monitor': {
          template: require('./sensor/sensor.pug'),
          controller: 'SensorMonitor as vm'
        }
      }
    })
    .state('app.monitor.section', {
      url: '/section/:name',
      views: {
        'module@app.monitor': {
          template: require('./section/section.pug'),
          controller: 'SectionMonitor as vm'
        }
      },
      resolve: {
        section: (msApi, $stateParams) => {
          let sectionName = $stateParams.name;
          return msApi.resolve(`monitor.sections.${sectionName}@get`);
        }
      }
    });

  // api
  msApiProvider.register('warning.thresholds', [
    'app/data/warning/thresholds.json'
  ]);
  msApiProvider.register('monitor.navigation.type', [
    'app/data/monitor/navigation-type.json'
  ]);
  msApiProvider.register('monitor.navigation.section', [
    'app/data/monitor/navigation-section.json'
  ]);
  msApiProvider.register('monitor.sections.FCXF-X-03', [
    'app/data/monitor/sections/FCXF-X-03.json'
  ]);

  // translation
  $translatePartialLoaderProvider.addPart('app/main/monitor');

  // navigation
  msNavigationServiceProvider.saveItem('apps.monitor', {
    title: 'monitor',
    icon: 'icon-chart-areaspline',
    state: 'app.monitor',
    translate: 'MONITOR.MONITOR_NAV',
    weight: MONITOR_WEIGHT
  });
}

/* vim:set sw=2 ts=2 sts=2: */
