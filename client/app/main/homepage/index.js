'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import config from './homepage.config';
import HomepageController from './homepage.controller';

export default angular
  .module('app.homepage', [uiRouter])
  .config(config)
  .controller('HomepageController', HomepageController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
