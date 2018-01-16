'use strict';

/**
 * The echart's handler for click event.
 *
 * @this the echart instance
 */
function onClick(params) {
  let option = this.getOption();
  let assessments = option.series[2].data;

  // click on the bar series
  if (params.seriesId == 'assessmentOverview') {
    this.setOption({
      visualMap: [{}, {seriesIndex: [2, 3, 4]}],
      bmap: {
        center: assessments[params.dataIndex].value,
        zoom: 15
      },
      series: [
        {}, {}, {}, {},
        {
          type: 'scatter',
          symbolSize: 15,
          coordinateSystem: 'bmap',
          data: [assessments[params.dataIndex]],
          label: {
            normal: {
              show: true,
              position: 'top',
              rotate: 45,
              align: 'left',
              formatter(args) {
                return `{name|${args.data.name}\n}{normal|安全指标:}{result|${args.data.value[2]}}`;
              },
              rich: {
                name: {
                  fontSize: 15,
                  fontWeight: 'bold',
                  lineHeight: 20,
                  color: 'rgba(18,89,127, 1)',
                  textBorderWidth: 0,
                  textBorderColor: 'transparent'
                },
                normal: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'rgba(18,89,127, 1)',
                  textBorderColor: 'transparent'
                },
                result: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'auto',
                  textBorderColor: 'transparent'
                }
              }
            }
          },
          zlevel: -2
        }
      ]
    });
  }

  // click on the bridge node
  if (params.seriesId == 'onlineAssessment') {
    window.open(params.data.url, '_blank');
  }
}

export default class HomepageController {
  /*********************
   *       Data        *
   *********************/
  chart = {
    config: {
      theme: 'default',
      events: {click: onClick},
      dataLoaded: true
    },
    option: {
      grid: [
        {
          right: 25,
          width: 200,
          top: '10%',
          height: '80%'
        },
        {
          show: true,
          right: 0,
          width: 320,
          top: '0%',
          height: '100%',
          backgroundColor: 'rgba(18, 89, 147, 0.8)'
        }
      ],
      title: [
        {
          text: '邢临高速公路交通安全可视化',
          textStyle: {
            color: 'rgba(18, 89, 147, 1)',
            fontSize: 30
          },
          subtext: '点击右侧柱状图可对应到桥梁',
          left: 0,
          top: 0,
          padding: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        },
        {
          text: '桥梁结构状态在线评估',
          textStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold'
          },
          right: 50,
          top: '5%'
        }
      ],
      tooltip: {show: false},
      bmap: {
        center: [114.740186,36.98852],
        zoom: 14,
        roam: true,
        mapStyle: {
          styleJson: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: {
                lightness: 20,
                saturation: -80
              }
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: {visibility: 'off'}
            },
            {
              featureType: 'building',
              elementType: 'all',
              stylers: {visibility: 'off'}
            },
            {
              featureType: 'green',
              elementType: 'all',
              stylers: {visibility: 'off'}
            },
            {
              featureType: 'boundary',
              elementType: 'all',
              stylers: {visibility: 'off'}
            },
            {
              featureType: 'local',
              elementType: 'all',
              stylers: {visibility: 'off'}
            },
            {
              featureType: 'manmade',
              elementType: 'all',
              stylers: {visibility: 'off'}
            },
            {
              featureType: 'label',
              elementType: 'all',
              stylers: {visibility: 'off'}
            }
          ]
        }
      },
      dataZoom: [
        {
          type: 'inside',
          yAxisIndex: 0,
          start: 0,
          end: 100,
          filterMode: 'empty'
        }
      ],
      visualMap: [
        {
          seriesIndex: 1,
          type: 'piecewise',
          categories: [2, 1],
          color: ['orange', 'red'],
          show: false
        },
        {
          seriesIndex: [2, 3],
          type: 'piecewise',
          min: 60,
          max: 100,
          splitNumber: 4,
          top: '70%',
          color: ['green', 'yellow', 'red'],
          textStyle: {fontWeight: 'bold'}
        }
      ],
      xAxis: [
        {
          gridIndex: 0,
          position: 'bottom',
          type: 'value',
          min: 60,
          max: 100,
          interval: 10,
          axisLine: {
            show: true,
            lineStyle: {color: '#fff', width: 1}
          },
          axisTick: {
            show: true,
            lineStyle: {color: '#fff', width: 1}
          },
          axisLabel: {
            margin: 8,
            textStyle: {color: '#fff', fontWeight: 'bold'}
          },
          splitLine: {show: false}
        }
      ],
      yAxis: [
        {
          gridIndex: 0,
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {color: '#fff', width: 1}
          },
          axisTick: {show: false},
          axisLabel: {color: '#fff', fontWeight: 'bold'},
          data: []
        }
      ],
      series: [
        {
          id: 'road',
          type: 'lines',
          coordinateSystem: 'bmap',
          lineStyle: {
            normal: {
              color: 'rgba(18,89,147, 1)',
              opacity: 0.8,
              width: 3,
              shadowColor: 'rgba(0, 0, 0, 0.9)',
              shadowBlur: 10
            }
          },
          zlevel: -2,
          data: []
        },
        {
          id: 'realtimeWarning',
          type: 'effectScatter',
          effectType: 'ripple',
          rippleEffect: {
            scale: 3,
            brushType: 'fill'
          },
          coordinateSystem: 'bmap',
          symbolSize: 15,
          label: {
            normal: {
              show: true,
              position: 'bottom',
              rotate: 45,
              align: 'right',
              formatter(params) {
                let warningClass = ['', '橙色', '红色'];
                return `{name|${params.data.name}\n}`
                  + `{normal|未处理预警${params.data.label}个\n}`
                  + `{result|最高级别:${warningClass[params.data.value[2]]}}`;
              },
              rich: {
                name: {
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: 'rgba(18,89,127, 1)',
                  textBorderWidth: 0,
                  textBorderColor: 'transparent',
                  lineHeight: 20
                },
                normal: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'rgba(18,89,127, 1)',
                  textBorderColor: 'transparent',
                  lineHeight: 15
                },
                result: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'auto',
                  textBorderColor: 'transparent'
                }
              }
            }
          },
          zlevel: -2,
          data: []
        },
        {
          id: 'onlineAssessment',
          type: 'scatter',
          coordinateSystem: 'bmap',
          symbol: 'circle',
          symbolSize: 15,
          label: {
            normal: {show: false},
            emphasis: {
              show: true,
              position: 'top',
              rotate: 45,
              align: 'left',
              formatter(params) {
                return `{name|${params.data.name}\n}`
                  + `{normal|安全指标:}{result|${params.data.value[2]}}`;
              },
              rich: {
                name: {
                  fontSize: 15,
                  fontWeight: 'bold',
                  lineHeight: 20,
                  color: 'rgba(18,89,127, 1)',
                  textBorderWidth: 0,
                  textBorderColor: 'transparent'
                },
                normal: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'rgba(18,89,127, 1)',
                  textBorderColor: 'transparent'
                },
                result: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'auto',
                  textBorderColor: 'transparent'
                }
              }
            }
          },
          zlevel: -2,
          data: []
        },
        {
          id: 'assessmentOverview',
          type: 'bar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          animationEasing: 'elasticOut',
          animationDelay(idx) {
            return idx * 100;
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter(params) {
                return params.data[1];
              }
            }
          },
          encode: {x: 1, y: 0},
          zlevel: 2,
          data: []
        }
      ]
    }
  };

  /*********************
   *      Methods      *
   *********************/
  constructor(bridges) {
    'ngInject';
    this.bridges = bridges.data;
  }

  $onInit() {
    // load data
    let series = this.chart.option.series;
    let yAxis = this.chart.option.yAxis;
    for (var i = 0; i < this.bridges.length; i++) {
      // road data
      if (i < this.bridges.length - 1) {
        series[0].data.push({
          coords: [
            this.bridges[i].location,
            this.bridges[i + 1].location
          ],
          // 路段的安全指标取两侧桥梁安全指标的较小值
          value: Math.min(this.bridges[i].conditionAssessment, this.bridges[i + 1].conditionAssessment)
        });
      }

      // warning data
      if (this.bridges[i].realtimeWarning.length > 0) {
        series[1].data.push({
          name: this.bridges[i].name,
          value: this.bridges[i].location.concat(Math.max(...this.bridges[i].realtimeWarning)),
          label: this.bridges[i].realtimeWarning.length
        });
      }

      // assessment data
      series[2].data.push({
        name: this.bridges[i].name,
        value: this.bridges[i].location.concat(this.bridges[i].conditionAssessment),
        url: this.bridges[i].url
      });

      // bar data
      yAxis[0].data.push(this.bridges[i].name);
      series[3].data.push([this.bridges[i].name, this.bridges[i].conditionAssessment]);
    }
  }
}

/* vim:set sw=2 ts=2 sts=2: */
