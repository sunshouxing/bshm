'use strict';

import angular from 'angular';
// import fuse scripts
import './core';

import './navigation/navigation.module';
import './navigation/navigation.controller';

import './toolbar/toolbar.module';
import './toolbar/toolbar.controller';

import './quick-panel/quick-panel.module';
import './quick-panel/quick-panel.controller';
import './quick-panel/tabs/chat/chat-tab.controller';

import './main/sample/sample.module';
import './main/sample/sample.controller';

import routes from './index.route';
import config from './index.config';
import run from './index.run';
import api from './index.api';
import {IndexController, MainController} from './index.controller';

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
  .controller('IndexController', IndexController)
  .controller('MainController', MainController);
