'use strict';

import { MONITOR_WEIGHT } from '../apps.weight';

export default function($stateProvider, $stateParamsProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.monitor', {
      url: '/monitor/:bridge',
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
      url: '/sensor/:sensor',
      views: {
        'module@app.monitor': {
          template: require('./sensor/sensor.pug'),
          controller: 'SensorMonitor as vm'
        }
      }
    })
    .state('app.monitor.section', {
      url: '/section/:section',
      views: {
        'module@app.monitor': {
          template: require('./section/section.pug'),
          controller: 'SectionMonitor as vm'
        }
      },
      resolve: {
        section: (msApi, $stateParams) => {
          let bridge = $stateParams.bridge;
          let section = $stateParams.section;
          return msApi.resolve(`monitor.${bridge}.sections.${section}@get`);
        },
        fakeData: (msApi, $stateParams) => {
          let bridge = $stateParams.bridge;
          return msApi.resolve(`monitor.${bridge}.fakeData@get`);
        },
        sensors: (msApi, $stateParams) => {
          let bridge = $stateParams.bridge;
          return msApi.resolve(`monitor.${bridge}.sensors.basicInfo@get`);
        }
      }
    });

  // api
  msApiProvider.register('warning.thresholds', [
    'app/data/warning/thresholds.json'
  ]);

  msApiProvider.register('monitor.baofu.fakeData', [
    'app/data/monitor/baofu/realtime-data.json'
  ]);
  msApiProvider.register('monitor.baofu.navigation.type', [
    'app/data/monitor/baofu/navigation-type.json'
  ]);
  msApiProvider.register('monitor.baofu.navigation.section', [
    'app/data/monitor/baofu/navigation-section.json'
  ]);
  msApiProvider.register('monitor.baofu.sections.FCXF-X-01', [
    'app/data/monitor/baofu/sections/FCXF-X-01.json'
  ]);
  msApiProvider.register('monitor.baofu.sections.FCXF-X-02', [
    'app/data/monitor/baofu/sections/FCXF-X-02.json'
  ]);
  msApiProvider.register('monitor.baofu.sections.FCXF-X-03', [
    'app/data/monitor/baofu/sections/FCXF-X-03.json'
  ]);
  msApiProvider.register('monitor.baofu.sections.FCXF-X-04', [
    'app/data/monitor/baofu/sections/FCXF-X-04.json'
  ]);
  msApiProvider.register('monitor.baofu.sections.FCXF-X-05', [
    'app/data/monitor/baofu/sections/FCXF-X-05.json'
  ]);
  msApiProvider.register('monitor.baofu.sensors.basicInfo', [
    'app/data/monitor/baofu/sensors-basic-info.json'
  ]);

  msApiProvider.register('monitor.nanlihe.fakeData', [
    'app/data/monitor/nanlihe/realtime-data.json'
  ]);
  msApiProvider.register('monitor.nanlihe.navigation.type', [
    'app/data/monitor/nanlihe/navigation-type.json'
  ]);
  msApiProvider.register('monitor.nanlihe.navigation.section', [
    'app/data/monitor/nanlihe/navigation-section.json'
  ]);
  msApiProvider.register('monitor.nanlihe.sensors.basicInfo', [
    'app/data/monitor/nanlihe/sensors-basic-info.json'
  ]);

  // translation
  $translatePartialLoaderProvider.addPart('app/main/monitor');

  // navigation
  msNavigationServiceProvider.saveItem('baofu.monitor', {
    title: 'monitor',
    icon: 'icon-chart-areaspline',
    state: 'app.monitor',
    stateParams: {bridge: 'baofu'},
    translate: 'MONITOR.MONITOR_NAV',
    weight: MONITOR_WEIGHT
  });
  msNavigationServiceProvider.saveItem('nanlihe.monitor', {
    title: 'monitor',
    icon: 'icon-chart-areaspline',
    state: 'app.monitor',
    stateParams: {bridge: 'nanlihe'},
    translate: 'MONITOR.MONITOR_NAV',
    weight: MONITOR_WEIGHT
  });
}

/* vim:set sw=2 ts=2 sts=2: */
