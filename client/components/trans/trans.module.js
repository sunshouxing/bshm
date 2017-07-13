'use strict';

import angular from 'angular';

import trans from './zh_CN.json';

function config(gettextCatalog) {
  'ngInject';
  gettextCatalog.debug = true;
  gettextCatalog.setStrings('zh_CN', trans.zh_CN);
  gettextCatalog.setCurrentLanguage('zh_CN');
  //gettextCatalog.setCurrentLanguage('en_US');
}

export default angular.module('bshmApp.trans', [])
  .run(config)
  .name;
