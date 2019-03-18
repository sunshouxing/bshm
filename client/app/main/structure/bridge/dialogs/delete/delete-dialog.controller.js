'use strict';

import angular from 'angular';

export default class DeleteDialogController {
  // data
  bridges = [];

  constructor($mdDialog, bridges) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.bridges = bridges;

    // set all bridges' delete flag to be true
    angular.forEach(this.bridges, bridge => {
      bridge.delete = true;
    });
  }

  $onInit() {}

  /**
   * Cancel the operation of deleting bridges.
   */
  cancel() {
    this.$mdDialog.cancel();
  }

  /**
   * Confirm the operation of deleting bridges.
   */
  confirm() {
    this.$mdDialog.hide(this.bridges);
  }
}
