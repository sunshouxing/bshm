'use strict';

import _ from 'lodash';
import angular from 'angular';

export default class SectionMonitor {
  /*********************
   *       Data        *
   *********************/

  ORIGINAL_CHART_WIDTH = 1200;
  FETCH_DATA_INTERVAL = 2000;

  /*********************
   *      Methods      *
   *********************/
  constructor($state, $interval, $scope, section, sensors, thresholds) {
    'ngInject';

    this.$state = $state;
    this.$interval = $interval;
    this.$scope = $scope;

    this.section = section;
    this.sensors = sensors.data;
    this.thresholds = thresholds;
  }

  $onInit() {
    this.subsetCenters = this.section.subsets.map(subset => subset.center);
    this.scaledCenters = this.subsetCenters.map(center => center.slice());

    let chartWrapper = angular.element(document.querySelector('.chartwrapper'));
    chartWrapper.css({
      background: `url("${this.section.image.url}") no-repeat center`,
      'background-size': 'contain'
    });

    this.$scope.$watch(
      () => chartWrapper.width(),
      (newValue, oldValue, scope) => {
        let vm = scope.vm;
        let scale = newValue / vm.ORIGINAL_CHART_WIDTH;

        for (let i = 0; i < vm.scaledCenters.length; i++) {
          vm.scaledCenters[i][0] = vm.subsetCenters[i][0] * scale;
          vm.scaledCenters[i][1] = vm.subsetCenters[i][1] * scale;
        }
      },
      true
    );

    // extend sensors info with name and activated
    for (const name in this.sensors) {
      this.sensors[name].name = name;
      this.sensors[name].activated = 1;
    }

    // echart configs and options
    this.chart = {
      config: {
        dataLoaded: false,
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
        dataset: [],
        series: []
      }
    };

    // init pie chart series option
    for (let i = 0; i < this.scaledCenters.length; i++) {
      let center = this.scaledCenters[i];
      let pieChart = {
        type: 'pie',
        radius: [0, 9],
        stillShowZeroSum: false,
        LegendHoverLink: true,
        itemStyle: {
          opacity: 1.0
        },
        label: {
          show: true,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          formatter(params) {
            let data = params.data;
            let value = data.value ? data.value.toFixed(3) : '-.---';

            let labelName = `{labelName|${data.name}}`;
            let labelLine = '{gap|}\n{labelLine|}\n{gap|}';
            let LabelData = `{${data.status}LabelData|${value} ${data.unit}}`;

            return `${labelName}\n${labelLine}\n${LabelData}`;
          },
          rich: {
            labelName: {
              fontSize: 12,
              fontWeight: 'bold',
              align: 'center',
              padding: [0, 0, 6, 0]
            },
            labelLine: {
              width: '100%',
              height: 0,
              borderColor: 'auto',
              borderWidth: 0.5
            },
            gap: {
              height: 2
            },
            redLabelData: {
              backgroundColor: 'red',
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
              align: 'center',
              padding: [3, 3, 3, 3],
              borderRadius: 3
            },
            yellowLabelData: {
              backgroundColor: 'orange',
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
              align: 'center',
              padding: [3, 3, 3, 3],
              borderRadius: 3
            },
            greenLabelData: {
              backgroundColor: 'green',
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
              align: 'center',
              padding: [3, 3, 3, 3],
              borderRadius: 3
            }
          }
        },
        encode: {
          name: 'name',
          value: 'activated',
          itemID: 'name',
          itemName: 'type'
        }
      };

      // update serie's center and datasetIndex
      pieChart.center = center;
      pieChart.datasetIndex = i;

      this.chart.option.series.push(pieChart);
    }

    // init echart's dataset
    this.section.subsets.forEach(subset => {
      let source = subset.sensors.map(name => this.sensors[name]);
      this.chart.option.dataset.push({source});
    });

    // fetch realtime data periodically
    this.$interval(() => {
      let realtimeData = this._generateRandomData();
      let warningStatus = this._getWarningStatus(realtimeData);

      // update sensors' properties with new data value and warning status
      _.merge(this.sensors, realtimeData, warningStatus);
    }, this.FETCH_DATA_INTERVAL);

    this.chart.config.dataLoaded = true;
  }

  _generateRandomData() {
    let data = {
      'FCXF-X-03-S01': { value: 0 },
      'FCXF-X-03-T01': { value: 0 },
      'FCXF-X-03-S02': { value: 0 },
      'FCXF-X-03-T02': { value: 0 },
      'FCXF-X-03-S03': { value: 0 },
      'FCXF-X-03-T03': { value: 0 },
      'FCXF-X-03-S04': { value: 0 },
      'FCXF-X-03-T04': { value: 0 },
      'FCXF-X-03-S05': { value: 0 },
      'FCXF-X-03-T05': { value: 0 },
      'FCXF-X-03-S06': { value: 0 },
      'FCXF-X-03-T06': { value: 0 },
      'FCXF-X-03-A01': { value: 0 },
      'FCXF-X-03-A02': { value: 0 },
      'FCXF-X-03-S07': { value: 0 },
      'FCXF-X-03-T07': { value: 0 },
      'FCXF-X-03-S08': { value: 0 },
      'FCXF-X-03-T08': { value: 0 },
      'FCXF-X-03-S09': { value: 0 },
      'FCXF-X-03-T09': { value: 0 },
      'FCXF-X-03-S10': { value: 0 },
      'FCXF-X-03-T10': { value: 0 }
    };

    for (let sensor in data) {
      data[sensor].value = Math.random() * 10;
    }

    return data;
  }

  _getWarningStatus(data) {
    let warningStatus = {};

    for (const sensor in data) {
      let value = data[sensor].value;
      let threshold = this.thresholds[sensor];
      let status = null;

      if (value <= threshold[0]) {
        status = 'red';
      } else if (value > threshold[0] && value <= threshold[1]) {
        status = 'yellow';
      } else if (value > threshold[1] && value < threshold[2]) {
        status = 'green';
      } else if (value >= threshold[2] && value < threshold[3]) {
        status = 'yellow';
      } else if (value >= threshold[3]) {
        status = 'red';
      }

      warningStatus[sensor] = {status};
    }

    return warningStatus;
  }
}

/* vim:set sw=2 ts=2 sts=2: */
