'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import config from './assessment.config';
import AssessmentController from './assessment.controller';

export default angular
  .module('app.assessment', [uiRouter])
  .config(config)
  .controller('AssessmentController', AssessmentController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
