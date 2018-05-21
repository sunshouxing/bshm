'use strict';

import angular from 'angular';
import moment from 'moment';

export default class WarningController {
  // data
  warnings = [];
  folders = [];

  // info about the uploading file
  uploadingFile = {};

  /**@ngInject*/
  constructor($scope, $mdSidenav, $mdToast, appConfig, socket, api, documents) {
    this.$mdSidenav = $mdSidenav;
    this.$mdToast = $mdToast;
    this.Files = api.files;
    this.socket = socket;
    this.documents = documents;

    let backendHost = appConfig.server.host || 'localhost';
    let backendPort = appConfig.server.port || 9000;
    this.backend = `http://${backendHost}:${backendPort}/api`;

    $scope.$on('$destroy', () => {
      this.socket.unsyncUpdates('file');
    });
  }

  $onInit() {
    angular.forEach(this.documents, item => {
      if (item.type === 'folder') {
        this.folders.push(item);
      } else {
        this.warnings.push(item);
      }
    });

    this.selected = this.warnings[0];
    this.socket.syncUpdates('file', this.warnings);
  }

  toggleSidenav(sidenavId) {
    this.$mdSidenav(sidenavId).toggle();
  }

  /**
   * select the item as current file
   */
  select(item) {
    this.selected = item;
  }
}

/* vim:set sw=2 ts=2 sts=2: */
