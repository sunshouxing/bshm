'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import config from './file-manager.config';
import FileManagerController from './file-manager.controller';

export default angular
  .module('app.file-manager', [uiRouter])
  .config(config)
  .controller('FileManagerController', FileManagerController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
