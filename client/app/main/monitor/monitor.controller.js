'use strict';

import angular from 'angular';

export default class MonitorController {
  /*********************
   *       Data        *
   *********************/

  /* how to organize sensors in the structure tree view
   * by type(default) / section
   */
  organizedBy = 'type';

  // the current monitoring sensor
  currentNode = null;

  nodePath = [];

  /*********************
   *      Methods      *
   *********************/
  constructor($state, $mdSidenav, msApi) {
    'ngInject';

    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.msApi = msApi;
  }

  $onInit() {
    this.organizeSensors();
  }

  /**
   * The event handler of an structure tree node selected.
   *
   * @param {Object} node -- the selected tree node
   */
  selectNode(node) {
    // when the selected node is a sensor(leaf node)
    if (!node.hasChildren) {
      // selected another sensor
      if (node != this.currentNode) {
        this.currentNode = node;
        this.nodePath = this._nodePath(node);
        this.$state.go('app.monitor.sensor', {sensorName: node.text});
      }
    } else if (this.organizedBy == 'section') {
      if (node.type == 'section') {
        this.nodePath = this._nodePath(node);
        this.$state.go('app.monitor.section', {id: node.text});
      }
    }
  }

  /**
   * Reorganize sensors in the way specified by field {organizedBy}.
   */
  organizeSensors() {
    this.msApi.request(`monitor.navigation.${this.organizedBy}@get`, {},
      // success callback
      response => {
        /* eslint-disable no-undef */
        this.navigation = new kendo.data.HierarchicalDataSource(response);
        /* eslint-enable */
      }
    );
  }

  /**
   * Toggle side navigation.
   *
   * @param {String} sidenavId -- the ID of this sidenav
   */
  toggleSidenav(sidenavId) {
    this.$mdSidenav(sidenavId).toggle();
  }

  _nodePath(node) {
    let path = [];
    let n = node;
    while (!angular.isUndefined(n)) {
      path.splice(0, 0, n.text);
      n = n.parent().parent();
    }

    return path;
  }
}

/* vim:set sw=2 ts=2 sts=2: */
