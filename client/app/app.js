'use strict';

import angular from 'angular';

import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import ngMessage from 'angular-messages';

import ngTranslate from 'angular-translate';
import 'angular-translate-loader-partial';
import 'angular-translate-storage-cookie';

import uiRouter from 'angular-ui-router';
import 'angular-material-data-table';
import 'angular-socket-io';

import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import fsize from '../components/fsize/fsize.filter';

// import fuse scripts
import './fuse';

import main from './main/main.module';
import sample from './main/sample/sample.module';
import fileManager from './main/file-manager';
import structure from './main/structure';

import routes from './app.route';
import config from './app.config';
import run from './app.run';
import api from './app.api';
import IndexController from './app.controller';

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
    socket,
    fsize,
    'md.data.table',
    'btford.socket-io',
    'app.core',
    'app.navigation',
    'app.toolbar',
    'app.quick-panel',
    // add your apps here
    structure,
    fileManager,
    sample,
    main
  ])
  .config(config)
  .config(routes)
  .run(run)
  .factory('api', api)
  .controller('IndexController', IndexController);

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['fuse'], {
      strictDi: true
    });
  });
