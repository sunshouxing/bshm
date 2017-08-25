'use strict';

import angular from 'angular';

import SampleController from './sample.controller';

export default angular
  .module('app.sample', [])
  .config(config)
  .controller('SampleController', SampleController)
  .name;

/** @ngInject */
function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
  // State
  $stateProvider
    .state('app.sample', {
      url: '/sample',
      views: {
        'content@app': {
          template: require('./sample.pug'),
          controller: 'SampleController as vm'
        }
      },
      resolve: {
        SampleData: msApi => msApi.resolve('sample@get')
      }
    });

  // translation
  $translatePartialLoaderProvider.addPart('app/main/sample');

  // api
  msApiProvider.register('sample', ['app/data/sample/sample.json']);

  // navigation
  msNavigationServiceProvider.saveItem('fuse', {
    title: 'SAMPLE',
    group: true,
    weight: 1
  });

  msNavigationServiceProvider.saveItem('fuse.sample', {
    title: 'Sample',
    icon: 'icon-tile-four',
    state: 'app.sample',
    /*stateParams: {
      'param1': 'page'
      },*/
    translate: 'SAMPLE.SAMPLE_NAV',
    weight: 1
  });
}
