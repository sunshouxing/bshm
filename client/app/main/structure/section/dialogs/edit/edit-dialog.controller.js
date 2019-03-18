'use strict';

import angular from 'angular';

export default class EditDialogController {
  // data
  section = {};

  bridges = [];

  // ngflow will be injected into here through its directive
  ngFlow = {
    flow: {},
    options: { // you can config the ngflow here
      target: 'api/files/upload'
    }
  };

  constructor($mdDialog, api, mode, section) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.api = api;
    this.mode = mode;
    this.section = section;
  }

  $onInit() {
    this.api.bridges.query(
      bridges => {
        this.bridges = bridges;

        if (this.mode === 'update') {
          angular.forEach(this.bridges, bridge => {
            if (bridge._id == this.section.pid) {
              this.associatedBridge = bridge;
            }
          });
        }
      }
    );
  }

  /**
   * Upload the section image
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
   */
  uploadSuccess(file) {
    this.section.image = {
      name: file.name,
      path: file.uniqueIdentifier
    };
  }

  /**
   * Search for associated bridges
   *
   * @param {String} text
   */
  search(text) {
    if (!text) {
      return this.bridges;
    }

    text = angular.lowercase(text);
    return this.bridges.filter(bridge => (bridge.name.indexOf(text) != -1));
  }

  /**
   * Confirm the operation of editing section.
   */
  confirm() {
    this.$mdDialog.hide(this.section);
  }

  /**
   * Cancel the operation of editing section.
   */
  cancel() {
    this.$mdDialog.cancel();
  }
}

/* vim:set sw=2 ts=2 sts=2: */
