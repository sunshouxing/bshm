'use strict';

export default class BridgeDeleteController {
  // data

  constructor($mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
  }

  $onInit() {
  }

  closeDialog() {
    this.$mdDialog.hide();
  }

}
