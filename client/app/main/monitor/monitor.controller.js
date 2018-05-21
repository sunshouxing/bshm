'use strict';

export default class MonitorController {
  /*********************
   *       Data        *
   *********************/

  /* how to organize sensors in the structure tree view
   * by type(default) / section
   */
  organizedBy = 'type';

  // the current monitoring sensor
  currentSensor = null;

  /*********************
   *      Methods      *
   *********************/
  constructor($state, $interval, msApi) {
    'ngInject';

    this.$state = $state;
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
      if (node.text != this.currentSensor) {
        this.currentSensor = node.text;
        this.$state.go('app.monitor.sensor', {sensorName: node.text});
      }
    } else if (this.organizedBy == 'section') {
      if (node.type == 'section') {
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
}

/* vim:set sw=2 ts=2 sts=2: */
