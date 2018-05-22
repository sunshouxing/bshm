'use strict';

import angular from 'angular';

export default class WarningController {
  // data
  warnings = [];

  FETCH_DATA_INTERVAL = 60 * 1000;

  // methods
  constructor($mdSidenav, $interval, api, warnings) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.$interval = $interval;
    this.Warnings = api.warnings;
    this.warnings = warnings;
  }

  $onInit() {
    this.selected = this.warnings[0];

    // fetch warnings from database periodically
    this.$interval(() => { this._fetchWarnings(); }, this.FETCH_DATA_INTERVAL);
  }

  _fetchWarnings() {
    this.Warnings.query(warnings => {
      this.warnings = warnings;
      console.log(this.warnings);
    })
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
