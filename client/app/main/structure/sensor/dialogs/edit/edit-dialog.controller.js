'use strict';

import angular from 'angular';

export default class EditDialogController {
  // data
  sensor = {
    from: 'johndoe@creapond.com'
  };

  attachments = [];

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
  constructor($mdDialog, mode, sensor) {
    this.$mdDialog = $mdDialog;
    this.mode = mode;
    this.sensor = sensor;
  }

  $onInit() {
  }

  /**
   * Remove the {index}th attachment from attachments list
   *
   * @param {Number} index
   */
  removeAttachment(index) {
    this.attachments.splice(index, 1);
  }

  /**
   * ngflow's file added callback
   * triggers when sensor image added to the uploader
   *
   * @param file
   */
  imageAdded(file) {
  }

  /**
   * Upload the sensor image
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
  uploadSuccess(file, message) {
    this.sensor.image = file.name;
    this.sensor.imageId = file.uniqueIdentifier;
  }

  /**
   * Confirm the operation of creating sensor.
   */
  confirm() {
    this.$mdDialog.hide(this.sensor);
  }

  /**
   * Cancel the operation of creating sensor.
   */
  cancel() {
    this.$mdDialog.cancel();
  }
}
