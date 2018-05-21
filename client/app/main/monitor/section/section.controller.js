'use strict';

export default class SectionMonitor {
  /*********************
   *       Data        *
   *********************/

  /*********************
   *      Methods      *
   *********************/
  constructor($state) {
    'ngInject';

    this.$state = $state;
  }

  $onInit() {
    this.chart = {
      config: {
        theme: 'default',
        dataLoaded: false
      },
      option: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        title: {
          text: '阜长线分离式立交主梁截面三数据视图',
          textStyle: {
            color: 'rgba(18, 89, 147, 0.75)',
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        legend: {
          show: true,
          selectedMode: 'multiple',
          orient: 'vertical',
          left: 10,
          bottom: 10
        },
        animation: false,
        dataset: dataset
      }
    };
  }
}

/* vim:set sw=2 ts=2 sts=2: */
