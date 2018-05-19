'use strict';

import angular from 'angular';

export default class MonitorController {
  /*********************
   *       Data        *
   *********************/

  // only display data in latest 30 nimutes
  MAX_DATA_LEN = 50 * 60 * 10;

  // defines how often to fetch the sensor data
  FETCH_DATA_INTERVAL = 1000;

  // the data's time offset of next query
  queryTime = parseInt(Date.now() / 1000) - 600;

  // the current monitoring sensor
  currentSensor = null;

  /*********************
   *      Methods      *
   *********************/
  constructor($state, $interval, $http, navigation, thresholds) {
    'ngInject';
    this.$state = $state;
    this.$interval = $interval;
    this.$http = $http;

    /* eslint-disable no-undef */
    this.navigation = new kendo.data.HierarchicalDataSource(navigation);
    /* eslint-enable */

    // sensor warning thresholds
    this.thresholds = thresholds.data;
  }

  $onInit() {
    this.yellowThreshold = 100;
    this.redThreshold = 150;

    this.chart = {
      config: {
        theme: 'default',
        dataLoaded: false
      },
      option: {
        title: {
          text: '实时监测数据',
          left: 'center',
          top: '3%',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'rgba(18, 89, 147, 1)'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            axis: 'x',
            snap: true
          },
          formatter(params) {
            return `${params[0].value[0].toLocaleTimeString()} / ${params[0].value[1]}`;
          }
        },
        visualMap: {
          type: 'piecewise',
          seriesIndex: [0, 1],
          pieces: [
            {gte: this.redThreshold},
            {gte: this.yellowThreshold, lt: this.redThreshold},
            {lt: this.yellowThreshold}
          ],
          color: ['red', 'orange', 'green'],
          show: false
        },
        toolbox: {
          feature: {
            dataZoom: {show: true},
            restore: {show: true},
            dataView: {show: true},
          }
        },
        dataZoom: {type: 'inside'},
        xAxis: {
          type: 'time',
          splitNumber: 10,
          splitLine: {show: true},
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {color: 'rgba(18, 89, 147, 1)', width: 2}
          },
          axisTick: {
            show: true,
            lineStyle: {color: 'rgba(18, 89, 147, 1)', width: 1.5}
          },
          axisLabel: {
            margin: 8,
            textStyle: {color: 'rgba(18, 89, 147, 0.8)', fontWeight: 'bold'}
          },
          min(value) { return Math.ceil(value.max / 30000) * 30000 - 300000; },
          max(value) { return Math.ceil(value.max / 30000) * 30000; }
        },
        yAxis: {
          type: 'value',
          scale: true,
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {color: 'rgba(18, 89, 147, 1)', width: 2}
          },
          axisTick: {
            show: true,
            lineStyle: {color: 'rgba(18, 89, 147, 1)', width: 1.5}
          },
          axisLabel: {
            margin: 8,
            textStyle: {color: 'rgba(18, 89, 147, 0.8)', fontWeight: 'bold'}
          },
          splitLine: {show: true}
        },
        series: [
          {
            name: 'realtimeData',
            type: 'line',
            symbolSize: 6,
            showSymbol: false,
            animation: false,
            data: [],
            markLine: {
              lineStyle: {
                normal: {width: 1.5, opacity: 0.8}
              },
              label: {
                normal: {
                  color: 'auto',
                  fontSize: 13,
                  fontWeight: 'bold',
                  // textBorderColor: 'auto',
                  // textBorderWidth: 2,
                  formatter(params) { return params.name; }
                },
                emphasis: {
                  formatter(params) { return `${params.name}：${params.value}`; }
                }
              },
              data: [
                {
                  name: '橙色预警阈值',
                  yAxis: this.yellowThreshold,
                  lineStyle: {
                    normal: { color: 'orange' }
                  }
                },
                {
                  name: '红色预警阈值',
                  yAxis: this.redThreshold,
                  lineStyle: {
                    normal: { color: 'red' }
                  }
                }
              ]
            },
            markPoint: {
              itemStyle: {
                normal: {opacity: 0.8}
              },
              label: {
                normal: {fontWeight: 'bold'}
              },
              data: [
                {
                  name: '最大值',
                  type: 'max',
                  itemStyle: {
                    normal: {color: 'rgb(194, 53, 49)'}
                  }
                },
                {
                  name: '最小值',
                  type: 'min',
                  itemStyle: {
                    normal: {color: 'rgb(18, 89, 147)'}
                  }
                }
              ]
            }
          },
          {
            name: 'latestData',
            type: 'scatter',
            symbol: 'emptyCircle',
            symbolSize: 6,
            label: {
              normal: {
                show: true,
                position: 'right',
                align: 'left',
                color: '#fff',
                fontWeigth: 'bolder',
                textBorderColor: 'auto',
                textBorderWidth: 2,
                formatter(params) {
                  let time = params.data.value[0].toLocaleTimeString();
                  let data = params.data.value[1];
                  return `${time} / ${data}`;
                }
              }
            }
          }
        ]
      }
    };

    // fetch realtime data from database periodically
    this.$interval(() => {
      this.getRealtimeData();
    }, this.FETCH_DATA_INTERVAL);
  }

  //TODO for test
  getRealtimeData() {
    let time = new Date(Date.now() / 1000 * 1000);
    let data = Math.random() * 200;

    let name = [time.getHours(), time.getMinutes(), time.getSeconds()].join(':');

    this.updateChart({name, value: [time, data]});

    // set dataLoaded flag true to make echart draw realtime data line
    this.chart.config.dataLoaded = true;
  }

  // getRealtimeData() {
  //   let channel = this.$state.params.channel;

  //   this.$http.get(`/api/realtime-data/${channel}`, {
  //     params: {timestamp: this.queryTime}
  //   }).then(response => {
  //     angular.forEach(response.data, record => {
  //       if (record.timestamp > this.queryTime) {
  //         this.queryTime = record.timestamp;
  //         console.log(`query time: ${this.queryTime}`);
  //       }

  //       let startTime = record.timestamp * 1000;
  //       let increment = 5000 / record.data.length;

  //       for (let i = 0; i < record.data.length; i++) {
  //         let time = new Date(startTime + i * increment);
  //         let timeStr = [time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()].join(':');

  //         this.updateChart({
  //           name: timeStr,
  //           value: [time, record.data[i]]
  //         });
  //       }
  //     });

  //     // set dataLoaded flag true to make echart draw realtime data line
  //     this.chart.config.dataLoaded = true;
  //   });
  // }

  updateChart(data) {
    let series = this.chart.option.series;

    if (series[0].data.length > this.MAX_DATA_LEN) {
      series[0].data.shift();
    }

    series[0].data.push(data);
    series[1].data = [data];
  }

  selectNode(node) {
    // when the selected node is a sensor(leaf node)
    if (angular.isUndefined(node.items)) {
      // selected another sensor
      if (node.text != this.currentSensor) {
        this.currentSensor = node.text;
        this.$state.go('app.monitor', {channel: node.text});
      }
    } else {
      node.expanded = !node.expanded;
    }
  }
}

/* vim:set sw=2 ts=2 sts=2: */
