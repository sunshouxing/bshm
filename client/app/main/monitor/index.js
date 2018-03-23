'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import config from './monitor.config';
import MonitorController from './monitor.controller';

export default angular
  .module('app.monitor', [uiRouter, 'kendo.directives'])
  .config(config)
  .controller('MonitorController', MonitorController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
