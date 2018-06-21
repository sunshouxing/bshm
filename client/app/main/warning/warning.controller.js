'use strict';

import angular from 'angular';

export default class WarningController {
  /*********************
   *       Data        *
   *********************/

  /* all the warnings  */
  warnings = [];

  /* pagination settings */
  pagination = {size: 10, page: 1};

  /* the interval to fetch and update warnings */
  FETCH_DATA_INTERVAL = 60 * 1000;

  /*********************
   *     Methods       *
   *********************/
  constructor($mdSidenav, $mdDialog, $document, $interval, api, warnings) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.$interval = $interval;
    this.Warnings = api.warnings;
    this.warnings = warnings;
  }

  $onInit() {
    this.selected = this.warnings[0];

    // fetch warnings from database periodically
    this.$interval(() => { this._fetchWarnings(); }, this.FETCH_DATA_INTERVAL);
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

  /**
   * Show the warning guide lines
   *
   * @param {Event} event
   */
  showGuides(event) {
    this.$mdDialog.show({
      template: require('./dialogs/guides.pug'),
      controller: 'GuidesDialogController',
      controllerAs: 'vm',
      parent: angular.element(this.$document.body),
      targetEvent: event,
      clickOutsideToClose: true
    });
  }

  _fetchWarnings() {
    this.Warnings.query(warnings => {
      this.warnings = warnings;
    });
  }
}

/* vim:set sw=2 ts=2 sts=2: */
