'use strict';

import angular from 'angular';

export default class DeleteDialogController {
  // data
  sections = [];

  constructor($mdDialog, sections) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.sections = sections;

    // set all sections' delete flag to be true
    angular.forEach(this.sections, section => {
      section.delete = true;
    });
  }

  $onInit() {}

  /**
   * Cancel the operation of deleting sections.
   */
  cancel() {
    this.$mdDialog.cancel();
  }

  /**
   * Confirm the operation of deleting sections.
   */
  confirm() {
    this.$mdDialog.hide(this.sections);
  }
}
