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
import './fuse';

import sample from './main/sample/sample.module';
import fileManager from './main/file-manager/file-manager.component';

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
    sample,
    fileManager
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
