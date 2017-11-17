'use strict';

export default class EditDialogController {
  // data
  bridge = {};

  // ngflow will be injected into here through its directive
  ngFlow = {
    flow: {},
    options: { // you can config the ngflow here
      target: 'api/files/upload'
    }
  };

  /**@ngInject*/
  constructor($mdDialog, mode, bridge) {
    this.$mdDialog = $mdDialog;
    this.mode = mode;
    this.bridge = bridge;
  }

  $onInit() {}

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
   */
  uploadSuccess(file) {
    this.bridge.image = {
      name: file.name,
      path: file.uniqueIdentifier
    };
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

/* vim:set sw=2 ts=2 sts=2: */
