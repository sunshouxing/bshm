'use strict';

import angular from 'angular';

import routes from './index.route';
import config from './index.config';
import run from './index.run';
import api from './index.api';
import IndexController from './index.controller';

angular
  .module('fuse', [
    'app.core',
    'app.navigation',
    'app.toolbar',
    'app.quick-panel',
    'app.sample'
  ])
  .config(config)
  .config(routes)
  .run(run)
  .factory('api', api)
  .controller('IndexController', IndexController);
