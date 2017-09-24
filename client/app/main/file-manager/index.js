'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ng-flow/dist/ng-flow-standalone';

import config from './file-manager.config';
import FileManagerController from './file-manager.controller';

export default angular
  .module('app.file-manager', [uiRouter, 'flow'])
  .config(config)
  .controller('FileManagerController', FileManagerController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */

// https://cdn.bootcss.com/angular.js/1.6.5/angular.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-animate.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-aria.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-cookies.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-loader.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-message-format.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-messages.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-parse-ext.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-resource.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-route.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-sanitize.min.js
// https://cdn.bootcss.com/angular.js/1.6.5/angular-touch.min.js
