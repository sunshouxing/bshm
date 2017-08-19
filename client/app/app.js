'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import ngMessage from 'angular-messages';
import ngTranslate from 'angular-translate';
import 'angular-translate-loader-partial';

import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import icon from '../components/icon/icon.directive';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.scss';

// import fuse scripts
import './core';

import './navigation/navigation.module.js';
import './navigation/navigation.controller.js';

import './toolbar/toolbar.module.js';
import './toolbar/toolbar.controller.js';

import './quick-panel/quick-panel.module.js';
import './quick-panel/quick-panel.controller.js';
import './quick-panel/tabs/chat/chat-tab.controller.js';

import './index.module.js';
import './index.constants.js';
import './index.route.js';
import './index.config.js';
import './index.run.js';
import './index.controller.js';
import './index.api.js';

import './main/main.controller.js';
import './main/sample/sample.module.js';
import './main/sample/sample.controller.js';

angular.module('bshmApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  uiBootstrap, _Auth, account, admin, 'validation.match', navbar, footer, icon, main,
  constants, socket, util, ngMaterial, ngMessage, ngTranslate,
  'fuse'
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['bshmApp'], {
      strictDi: true
    });
  });
