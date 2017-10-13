'use strict';

import angular from 'angular';
import moment from 'moment';

export default class FileManagerController {
  // data
  files = [];

  // ngflow will be injected into here through its directive
  ngFlow = {
    flow: {}
  };

  // you can configure the ngflow from here
  ngFlowOptions = {
    target: 'api/files/upload',
    chunkSize: 10 * 1024 * 1024,
    // maxChunkRetries          : 1,
    // simultaneousUploads      : 1,
    // testChunks               : false,
    // progressCallbacksInterval: 1000
  };

  /**@ngInject*/
  constructor($mdSidenav, documents) {
    this.$mdSidenav = $mdSidenav;
    this.documents = documents;
  }

  $onInit() {
    this.path = this.documents.data.path;
    this.folders = this.documents.data.folders;
    this.files = this.documents.data.files;

    this.selected = this.files[0];
  }

  toggleSidenav(sidenavId) {
    this.$mdSidenav(sidenavId).toggle();
  }

  select(item) {
    this.selected = item;
  }

  /**
   * ngflow's file added callback
   * triggers when files added to the uploader
   *
   * @param file
   */
  fileAdded(file) {
    // prepare the temp file data for file list
    let uploadingFile = {
      id: file.uniqueIdentifier,
      file,
      type: '',
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

    // append it to the file list
    this.files.push(uploadingFile);
  }

  /**
   * upload
   * automatically triggers when files added to the uploader
   */
  upload() {
    // debug
    console.log('uploading files added to uploader.');

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
    // debug
    console.log(`${file.name} is uploaded successfully.`);

    // iterate through the file list, find the one we
    // are added as a temp and replace its data

    // normally you would parse the message and extract
    // the uploaded file data from it
    angular.forEach(this.files, item => {
      if (item.id && item.id === file.uniqueIdentifier) {
        // normally you would update the file from
        // database but we are cheating here!

        // update the file info
        item.name = file.name;
        item.size = file.size;
        item.type = 'document';
      }
    });
  }
}

/* vim:set sw=2 ts=2 sts=2: */
