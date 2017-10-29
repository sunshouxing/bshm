'use strict';

import angular from 'angular';

export default class BridgeCreateController {
  // data
  bridge = {
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

  selectedMail = null;

  /**@ngInject*/
  constructor($mdDialog, mode, bridge) {
    this.$mdDialog = $mdDialog;
    this.mode = mode;
    this.bridge = bridge;
  }

  $onInit() {
    if (angular.isDefined(this.selectedMail)) {
      this.form.to = this.selectedMail.from.email;
      this.form.subject = `RE: ${this.selectedMail.subject}`;
      this.form.message = `<blockquote>${this.selectedMail.message}</blockquote>`;
    }
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
   * triggers when bridge image added to the uploader
   *
   * @param file
   */
  imageAdded(file) {
  }

  /**
   * Upload the bridge image
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
    this.bridge.image = file.name;
    this.bridge.imageId = file.uniqueIdentifier;
  }

  /**
   * Confirm the operation of creating bridge.
   */
  confirm() {
    this.$mdDialog.hide(this.bridge);
  }

  /**
   * Cancel the operation of creating bridge.
   */
  cancel() {
    this.$mdDialog.cancel();
  }
}
