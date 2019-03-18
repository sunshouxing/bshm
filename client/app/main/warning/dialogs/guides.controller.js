'use strict';

export default class GuidesDialogController {
  /**@ngInject*/
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
  }

  $onInit() {}

  /**
   * Cancel the operation of creating bridge.
   */
  cancel() {
    this.$mdDialog.cancel();
  }
}

/* vim:set sw=2 ts=2 sts=2: */
