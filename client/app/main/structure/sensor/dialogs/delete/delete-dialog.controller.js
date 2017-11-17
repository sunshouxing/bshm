'use strict';

import angular from 'angular';

export default class DeleteDialogController {
  // data
  sensors = [];

  constructor($mdDialog, sensors) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.sensors = sensors;

    // set all sensors' delete flag to be true
    angular.forEach(this.sensors, sensor => {
      sensor.delete = true;
    });
  }

  $onInit() {}

  /**
   * Cancel the operation of deleting sensors.
   */
  cancel() {
    this.$mdDialog.cancel();
  }

  /**
   * Confirm the operation of deleting sensors.
   */
  confirm() {
    this.$mdDialog.hide(this.sensors);
  }
}
