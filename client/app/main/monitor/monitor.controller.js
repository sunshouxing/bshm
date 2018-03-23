'use strict';

import angular from 'angular';

export default class MonitorController {
  /*********************
   *       Data        *
   *********************/

  chart = {
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
          color: '#fff',
          fontWeigth: 'bold',
          textBorderColor: 'rgba(18, 89, 147, 1)',
          textBorderWidth: 2
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
          return `${params[0].value[0].toLocaleTimeString()}<br>${params[0].value[1]}`;
        }
      },
      // visualMap: {
      //   type: 'piecewise',
      //   pieces: [
      //     {min: 2000},
      //     {min: 1500, max: 2000},
      //     {min: 0, max: 1500}
      //   ],
      //   color: ['red', 'orange', 'green'],
      //   show: false
      // },
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
        // 把min与max注释掉，数据更新会变成向左移动的模式
        min(value) { return Math.ceil(value.max / 30000) * 30000 - 300000; },
        max(value) { return Math.ceil(value.max / 30000) * 30000; },
        splitNumber: 10,
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
      yAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax',
        boundaryGap: [0, '100%'],
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
        splitLine: {show: true},
        // min: 0,
        // max: 3000
      },
      series: [
        {
          name: 'realtimeData',
          type: 'line',
          symbolSize: 6,
          showSymbol: false,
          hoverAnimation: false,
          data: [],
          // markLine: {
          //   lineStyle: {
          //     normal: {width: 1.5, opacity: 0.8}
          //   },
          //   label: {
          //     normal: {
          //       color: '#fff',
          //       fontSize: 13,
          //       fontWeigth: 'bolder',
          //       textBorderColor: 'auto',
          //       textBorderWidth: 2,
          //       formatter(params) { return params.name; }
          //     },
          //     emphasis: {
          //       formatter(params) { return `${params.name}：${params.value}`; }
          //     }
          //   },
          //   data: [
          //     {
          //       name: '橙色预警阈值',
          //       yAxis: 1500,
          //       lineStyle: {normal: {color: 'orange'}}
          //     },
          //     {
          //       name: '红色预警阈值',
          //       yAxis: 2000,
          //       lineStyle: {normal: {color: 'red'}}
          //     }
          //   ]
          // },
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
                return `${params.data.value[0].toLocaleTimeString()}<br>${params.data.value[1]}`;
              }
            }
          }
        }
      ]
    }
  };

  // only display data in latest 30 nimutes
  MAX_DATA_LEN = 50 * 60 * 10;

  queryTime = parseInt(Date.now() / 1000) - 600;

  /*********************
   *      Methods      *
   *********************/
  constructor($state, $interval, $http) {
    'ngInject';
    this.$state = $state;
    this.$interval = $interval;
    this.$http = $http;
  }

  $onInit() {
    /* eslint-disable no-undef */
    this.treeData = new kendo.data.HierarchicalDataSource({
      data: [
        {
          text: '保阜大桥',
          items: [
            {
              text: '加速度传感器',
              items: [
                {text: 'FCXF-X-02-A01'},
                {text: 'FCXF-X-03-A01'},
                {text: 'FCXF-X-03-A02'},
                {text: 'FCXF-X-04-A01'}
              ]
            },
            {
              text: '应变传感器',
              items: [
                {text: 'FCXF-X-02-S01'},
                {text: 'FCXF-X-02-S02'},
                {text: 'FCXF-X-02-S03'},
                {text: 'FCXF-X-02-S04'},
                {text: 'FCXF-X-03-S05'},
                {text: 'FCXF-X-03-S06'},
                {text: 'FCXF-X-03-S01'},
                {text: 'FCXF-X-03-S02'},
                {text: 'FCXF-X-03-S03'},
                {text: 'FCXF-X-03-S04'},
                {text: 'FCXF-X-04-S01'},
                {text: 'FCXF-X-04-S02'},
                {text: 'FCXF-X-04-S03'},
                {text: 'FCXF-X-04-S04'}
              ]
            },
            {
              text: '温度传感器',
              items: [
                {text: 'FCXF-X-02-T01'},
                {text: 'FCXF-X-02-T02'},
                {text: 'FCXF-X-02-T03'},
                {text: 'FCXF-X-02-T04'},
                {text: 'FCXF-X-03-T01'},
                {text: 'FCXF-X-03-T02'},
                {text: 'FCXF-X-03-T03'},
                {text: 'FCXF-X-03-T04'},
                {text: 'FCXF-X-03-T05'},
                {text: 'FCXF-X-03-T06'},
                {text: 'FCXF-X-04-T01'},
                {text: 'FCXF-X-04-T02'},
                {text: 'FCXF-X-04-T03'},
                {text: 'FCXF-X-04-T04'}
              ]
            }
          ]
        }
      ]
    });
    /* eslint-enable */

    this.$interval(() => {
      this.getRealtimeData();
    }, 5000);

    this.chart.config.dataLoaded = true;
  }

  getRealtimeData() {
    let channel = this.$state.params.channel;

    this.$http.get(`/api/realtime-data/${channel}`, {
      params: {timestamp: this.queryTime}
    }).then(response => {
      angular.forEach(response.data, record => {
        if (record.timestamp > this.queryTime) {
          this.queryTime = record.timestamp;
          console.log(`query time: ${this.queryTime}`);
        }

        let startTime = record.timestamp * 1000;
        let increment = 5000 / record.data.length;

        for (let i = 0; i < record.data.length; i++) {
          let time = new Date(startTime + i * increment);
          let timeStr = [time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()].join(':');

          this.updateChart({
            name: timeStr,
            value: [time, record.data[i]]
          });
        }
      });

      console.log(`query time: ${this.queryTime}`);
    });
  }

  updateChart(data) {
    let series = this.chart.option.series;

    if (series[0].data.length > this.MAX_DATA_LEN) {
      series[0].data.shift();
    }

    series[0].data.push(data);
    series[1].data = [data];
  }

  gotoNode(node) {
    if (angular.isUndefined(node.items)) {
      this.$state.go('app.monitor', {channel: node.text});
    }
  }
}

/* vim:set sw=2 ts=2 sts=2: */
