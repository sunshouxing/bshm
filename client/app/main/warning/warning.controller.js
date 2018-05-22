'use strict';

import angular from 'angular';

export default class WarningController {
  // data
  warnings = [];

  // methods
  constructor($mdSidenav, api, warnings) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.Warnings = api.warnings;
    this.warnings = warnings;
  }

  $onInit() {
    this.selected = this.warnings[0];
  }

  /**
   * Toggle warning app's sidenav.
   *
   * @param {String} sidenavId -- sidenav's ID
   */
  toggleSidenav(sidenavId) {
    this.$mdSidenav(sidenavId).toggle();
  }

  /**
   * Select the item as current warning.
   */
  select(item) {
    this.selected = item;
  }
}

/* vim:set sw=2 ts=2 sts=2: */
