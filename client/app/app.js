'use strict';

import angular from 'angular';

import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import ngMessage from 'angular-messages';
import ngTranslate from 'angular-translate';
import 'angular-translate-loader-partial';
import uiRouter from 'angular-ui-router';

import util from '../components/util/util.module';

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

import routes from './app.route';
import config from './app.config';
import run from './app.run';
import api from './app.api';
import {IndexController, MainController} from './app.controller';

import './app.scss';

angular
  .module('fuse', [
    ngCookies,
    ngResource,
    ngSanitize,
    ngMaterial,
    ngMessage,
    ngTranslate,
    uiRouter,
    util,
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

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['fuse'], {
      strictDi: true
    });
  });
