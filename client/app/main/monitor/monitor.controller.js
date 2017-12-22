'use strict';

import angular from 'angular';

function randomData() {
    let time = new Date();
    let data = Math.floor(500 + Math.random() * 1000);
    return {
        name: time.toString(),
        value: [time, data]
    }
}

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
      visualMap: {
        type: 'piecewise',
        pieces: [
          {min: 2000},
          {min: 1500, max: 2000},
          {min: 0, max: 1500}
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
        // 把min与max注释掉，数据更新会变成向左移动的模式
        min: function (value) { return Math.ceil(value.max/30000) * 30000 - 300000 },
        max: function (value) { return Math.ceil(value.max/30000) * 30000 },
        splitNumber: 10,
        axisLine: {
          show: true,
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
        boundaryGap: [0, '100%'],
        axisLine: {
          show: true,
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
        min: 0,
        max: 3000
      },
      series: [
        {
          name: 'realtimeData',
          type: 'line',
          symbolSize: 6,
          showSymbol: false,
          hoverAnimation: false,
          data: [],
          markLine: {
            lineStyle: {
              normal: {width: 1.5, opacity: 0.8}
            },
            label: {
              normal: {
                color: '#fff',
                fontSize: 13,
                fontWeigth: 'bolder',
                textBorderColor: 'auto',
                textBorderWidth: 2,
                formatter: function (params) { return params.name }
              },
              emphasis: {
                formatter: function (params) { return params.name + '：' + params.value }
              }
            },
            data: [
              {
                name: '橙色预警阈值',
                yAxis: 1500,
                lineStyle: {normal: {color: 'orange'}}
              },
              {
                name: '红色预警阈值',
                yAxis: 2000,
                lineStyle: {normal: {color: 'red'}}
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
                itemStyle:{
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

  MAX_DATA_LEN = 60;

  /*********************
   *      Methods      *
   *********************/
  constructor($interval, monitor) {
    'ngInject';
    this.$interval = $interval;
    this.monitor = monitor;
  }

  $onInit() {
    this.$interval(() => {
      let latest = randomData();
      let series = this.chart.option.series;

      if (series[0].data.length > this.MAX_DATA_LEN) { series[0].data.shift(); }
      series[0].data.push(latest);
      series[1].data = [latest];
    }, 1000);

    this.chart.config.dataLoaded = true;
  }
}

/* vim:set sw=2 ts=2 sts=2: */
