'use strict';

import angular from 'angular';

export default function SensorMonitor($scope, $state, $interval, $http) {
  'ngInject';

  let vm = this;

  // Data

  // only display data in latest 30 nimutes
  let MAX_DATA_LEN = 50 * 60 * 10;

  // defines how often to fetch the sensor data
  let FETCH_DATA_INTERVAL = 1000;

  // the data's time offset of next query
  let queryTime = parseInt(Date.now() / 1000) - 600;

  let yellowThreshold = 100;
  let redThreshold = 150;

  vm.chart = {
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
          let time = params[0].value[0].toLocaleTimeString();
          let data = params[0].value[1].toPrecision(5);
          return `${time} / ${data}`;
        }
      },
      visualMap: {
        type: 'piecewise',
        seriesIndex: [0, 1],
        pieces: [
          {gte: redThreshold},
          {gte: yellowThreshold, lt: redThreshold},
          {lt: yellowThreshold}
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
                yAxis: yellowThreshold,
                lineStyle: {
                  normal: { color: 'orange' }
                }
              },
              {
                name: '红色预警阈值',
                yAxis: redThreshold,
                lineStyle: {
                  normal: { color: 'red' }
                }
              }
            ]
          },
          markPoint: {
            symbolSize: 25,
            itemStyle: {
              opacity: 0.8
            },
            label: {
              normal: {
                fontSize: 13,
                fontWeight: 'bold',
                formatter(params) {return `${params.name}:${params.value.toPrecision(5)}`;}
              }
            },
            data: [
              {
                name: '最大值',
                type: 'max',
                itemStyle: {
                  normal: { color: 'rgb(194, 53, 49)' }
                },
                label: {
                  normal: { position: 'top' }
                }
              },
              {
                name: '最小值',
                symbolRotate: '180',
                type: 'min',
                itemStyle: {
                  normal: { color: 'rgb(18, 89, 147)' }
                },
                label: {
                  normal: { position: 'bottom' }
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
                let data = params.data.value[1].toPrecision(5);
                return `${time}\n${data}`;
              }
            }
          }
        }
      ]
    }
  };

  // setup a timer to fetch sensor realtime data periodically
  let timer = $interval(() => { getRealtimeData(); }, FETCH_DATA_INTERVAL);
  // stop the timer when this scope is destroyed
  $scope.$on('$destroy', () => {
    $interval.cancel(timer);
  });

  // reserve this function for test
  // function getRealtimeData() {
  //   console.log('fetching realtime data');
  //   let time = new Date(Date.now() / 1000 * 1000);
  //   let data = Math.random() * 200;
  //   let name = [time.getHours(), time.getMinutes(), time.getSeconds()].join(':');
  //   updateChart({name, value: [time, data]});
  // }

  function getRealtimeData() {
    $http.get(`/api/realtime-data/${$state.params.sensorName}`, {
      params: {timestamp: queryTime}
    }).then(response => {
      angular.forEach(response.data, record => {
        if (record.timestamp > queryTime) {
          queryTime = record.timestamp;
          console.log(`query time: ${queryTime}`);
        }

        let startTime = record.timestamp * 1000;
        let increment = 5000 / record.data.length;

        for (let i = 0; i < record.data.length; i++) {
          let time = new Date(startTime + i * increment);
          let timeStr = [time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()].join(':');

          updateChart({
            name: timeStr, value: [time, record.data[i]]
          });
        }
      });

      // set dataLoaded flag true to make echart draw realtime data line
      vm.chart.config.dataLoaded = true;
    });
  }

  function updateChart(data) {
    let series = vm.chart.option.series;

    if (series[0].data.length > MAX_DATA_LEN) {
      series[0].data.shift();
    }

    series[0].data.push(data);
    series[1].data = [data];

    // set dataLoaded flag true to make echart draw realtime data line
    vm.chart.config.dataLoaded = true;
  }
}

/* vim:set sw=2 ts=2 sts=2: */
