'use strict';

export default function($stateProvider, $translatePartialLoaderProvider) {
  'ngInject';

  // state
  $stateProvider
    .state('app.structure.sensor', {
      url: '/sensors',
      views: {
        'content@app': {
          template: require('./sensor.pug'),
          controller: 'SensorController as vm'
        }
      }
    })
    .state('app.structure.sensor.detail', {
      url: '/{id:[0-9a-f]{24}}',
    });

  // translation
  $translatePartialLoaderProvider.addPart('app/main/structure/sensor');
}

/* vim:set sw=2 ts=2 sts=2: */
