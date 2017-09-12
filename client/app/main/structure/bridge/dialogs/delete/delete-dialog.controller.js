'use strict';

import angular from 'angular';

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
