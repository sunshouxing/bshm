'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import config from './file-manager.config';

export class FileManagerController {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('app.file-manager', [uiRouter])
  .config(config)
  .component('fileManager', {
    template: require('./file-manager.pug'),
    controller: FileManagerController,
    controllerAs: 'vm'
  })
  .name;
