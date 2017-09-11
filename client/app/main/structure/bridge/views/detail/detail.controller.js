'use strict';

export default class BridgeDetailController {
  // data
  currentThread = null;

  constructor($state, msApi, bridge) {
    'ngInject';

    this.$state = $state;
    this.msApi = msApi;

    this.currentThread = bridge.data[0];
  }

  $onInit() {
  }

}
