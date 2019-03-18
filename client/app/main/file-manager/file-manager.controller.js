'use strict';

import angular from 'angular';
import moment from 'moment';

export default class FileManagerController {
  // data
  files = [];
  folders = [];

  // info about the uploading file
  uploadingFile = {};

  // ngflow will be injected into here through its directive
  ngFlow = {
    flow: {}
  };

  // you can configure the ngflow from here
  ngFlowOptions = {
    target: 'api/files/upload',
    chunkSize: 10 * 1024 * 1024
    // maxChunkRetries          : 1,
    // simultaneousUploads      : 1,
    // testChunks               : false,
    // progressCallbacksInterval: 1000
  };

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
    this.path = ['My files', 'Documents'];

    angular.forEach(this.documents, item => {
      if (item.type === 'folder') {
        this.folders.push(item);
      } else {
        this.files.push(item);
      }
    });

    this.selected = this.files[0];
    this.socket.syncUpdates('file', this.files);
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

  /**
   * delete selected file
   */
  delete() {
    this.Files.delete(
      {id: this.selected._id},
      (...res) => {
        console.log(`managed to delete ${this.selected.name} with response code ${res[2]}.`);
        this.selected = {};
        if (this.files.length > 0) {
          this.selected = this.files[0];
        }
      },
      err => {
        if (err.status == -1) {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent(`Failed to delete ${this.selected.name}`)
              .position('bottom right')
              .hideDelay(3000)
          );
        }
      }
    );
  }

  /**
   * ngflow's file added callback
   * triggers when files added to the uploader
   *
   * @param file
   */
  fileAdded(file) {
    // prepare the temp file data for file list
    this.uploadingFile = {
      id: file.uniqueIdentifier,
      file,
      type: 'document',
      owner: 'Emily Bennett',
      size: '',
      modified: moment().format('MMMM D, YYYY'),
      opened: '',
      created: moment().format('MMMM D, YYYY'),
      extention: '',
      location: 'My Files > Documents',
      offline: false,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    };
  }

  /**
   * upload
   * automatically triggers when files added to the uploader
   */
  upload() {
    // set headers
    this.ngFlow.flow.opts.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      //   'X-XSRF-TOKEN': $cookies.get('XSRF-TOKEN')
    };

    this.ngFlow.flow.upload();
  }

  /**
   * ngflow's file upload success callback
   * triggers when single upload completed
   *
   * @param file
   * @param message
   */
  fileSuccess(file, message) {
    console.log(message);

    let fileInfo = {
      // id: file.uniqueIdentifier,
      name: file.name,
      size: file.size,
      flowId: file.uniqueIdentifier,
      type: 'document',
      owner: 'Emily Bennett',
      opened: '',
      modified: this.uploadingFile.modified,
      created: this.uploadingFile.created,
      extention: '',
      location: 'My Files > Documents',
      offline: false,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    };
    // update the file's info, then append it to the file list
    this.uploadingFile = {};

    this.Files.save(
      fileInfo,
      (...res) => { // res incluces [value, responseHeaders(function), status, message]
        console.log(`manage to save file info to db with response status ${res[2]}`);
      },
      err => {
        console.log(`failed to save file info to db, error info: ${err}`);
      }
    );
  }
}

/* vim:set sw=2 ts=2 sts=2: */
