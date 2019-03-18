'use strict';

import angular from 'angular';

import MainController from './main.controller';
import config from './main.config';

export default angular
  .module('app.main', [])
  .config(config)
  .controller('MainController', MainController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
