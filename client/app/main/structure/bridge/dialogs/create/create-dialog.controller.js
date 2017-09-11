'use strict';

import angular from 'angular';

export default class BridgeCreateController {
  // data
  form = {
    from: 'johndoe@creapond.com'
  };

  hiddenCC = true;
  hiddenBCC = true;

  selectedMail = null;

  constructor($mdDialog, selectedMail) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.selectedMail = selectedMail;
  }

  $onInit() {
    if (angular.isDefined(this.selectedMail)) {
      this.form.to = this.selectedMail.from.email;
      this.form.subject = `RE: ${this.selectedMail.subject}`;
      this.form.message = `<blockquote>${this.selectedMail.message}</blockquote>`;
    }
  }

  closeDialog() {
    this.$mdDialog.hide();
  }

}
