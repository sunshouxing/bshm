'use strict';

import angular from 'angular';

import MainController from './main.controller';

export default angular
  .module('app.main', [])
  .config(config)
  .controller('MainController', MainController)
  .name;

/** @ngInject */
function config(msNavigationServiceProvider) {
  // register apps navigation group
  msNavigationServiceProvider.saveItem('apps', {
    title: 'APPS',
    group: true,
    weight: 1
  });
}

/* vim:set sw=2 ts=2 sts=2: */
