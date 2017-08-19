'use strict';

import angular from 'angular';

import './index.module';

angular.module('bshmApp', ['fuse']);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['bshmApp'], {
      strictDi: true
    });
  });
