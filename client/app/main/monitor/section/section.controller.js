'use strict';

export default class SectionMonitor {
  /*********************
   *       Data        *
   *********************/

  /*********************
   *      Methods      *
   *********************/
  constructor($state, section, thresholds) {
    'ngInject';

    this.$state = $state;
    this.section = section;
    this.thresholds = thresholds;
  }

  $onInit() {}
}

/* vim:set sw=2 ts=2 sts=2: */
