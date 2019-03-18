'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ng-flow/dist/ng-flow-standalone';

import config from './file-manager.config';
import constants from '../../app.constants';
import FileManagerController from './file-manager.controller';

export default angular
  .module('app.file-manager', [uiRouter, constants, 'flow'])
  .config(config)
  .controller('FileManagerController', FileManagerController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
