'use strict';

import angular from 'angular';

export default class DeleteDialogController {
  // data
  processors = [];

  constructor($mdDialog, processors) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.processors = processors;

    // set all processors' delete flag to be true
    angular.forEach(this.processors, processor => {
      processor.delete = true;
    });
  }

  $onInit() {}

  /**
   * Cancel the operation of deleting processors.
   */
  cancel() {
    this.$mdDialog.cancel();
  }

  /**
   * Confirm the operation of deleting processors.
   */
  confirm() {
    this.$mdDialog.hide(this.processors);
  }
}
