'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ng-flow/dist/ng-flow-standalone';

import config from './warning.config';
import constants from '../../app.constants';
import WarningController from './warning.controller';

export default angular
  .module('app.warning', [uiRouter, constants, 'flow'])
  .config(config)
  .controller('WarningController', WarningController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
