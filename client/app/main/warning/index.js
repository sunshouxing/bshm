'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ng-flow/dist/ng-flow-standalone';

import config from './warning.config';
import constants from '../../app.constants';
import WarningController from './warning.controller';
import GuidesDialogController from './dialogs/guides.controller';
import { warningLevelFilter, warningStatusFilter } from './warning.filter';

export default angular
  .module('app.warning', [uiRouter, constants, 'flow'])
  .config(config)
  .controller('WarningController', WarningController)
  .controller('GuidesDialogController', GuidesDialogController)
  .filter('level', warningLevelFilter)
  .filter('status', warningStatusFilter)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
