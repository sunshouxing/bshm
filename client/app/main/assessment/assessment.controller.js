'use strict';

import angular from 'angular';

/**
 * Transform source data from database to the format echart requires:
 * {value: x, children: [...]} => {nodes: [...], links: [...]}
 */
function transform(src, dst, weight) {
  dst.nodes.push({
    name: src.name,
    value: src.value
  });

  let globleWeight = weight * src.weight;
  if (src.children) {
    angular.forEach(src.children, child => {
      dst.links.push({
        source: src.name,
        target: child.name,
        weight: child.weight,
        value: child.weight * globleWeight
      });

      transform(child, dst, globleWeight);
    });
  }
}

export default class AssessmentController {
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
        text: '闵浦二桥结构性能在线评估',
        left: 'center'
      },
      visualMap: {
        type: 'piecewise',
        pieces: [
          {gt: 60, lte: 70}, // 差
          {gt: 70, lte: 80}, // 中
          {gt: 80, lte: 90}, // 良
          {gt: 90, lte: 100} // 优
        ],
        // 优：绿色；良：浅绿；中：橙色；差：红色
        color: ['green', 'yellow', 'red'],
        show: false
      },
      tooltip: {
        textStyle: {fontSize: 12},
        formatter(params) {
          if (params.dataType == 'node') {
            return `${params.marker + params.data.name}:${params.data.value.toFixed(2)}`;
          }
          if (params.dataType == 'edge') {
            return `${params.data.source}<<${params.data.target}<br>权重:${params.data.weight.toFixed(2)}`;
          }
        }
      },
      series: [{
        type: 'sankey',
        nodes: [],
        links: [],
        nodeWidth: 30,
        nodeGap: 10,
        layoutIterations: 2048,
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: '#aaa'
          }
        },
        lineStyle: {
          normal: {
            color: 'target',
            curveness: 0.3
          }
        }
      }]
    }
  };

  /*********************
   *      Methods      *
   *********************/
  constructor(assessment) {
    'ngInject';
    this.assessment = assessment;
  }

  $onInit() {
    // assess the whole bridge
    this.assess(this.assessment);

    // tranform the assessment to support echart requires
    let series = this.chart.option.series;
    transform(this.assessment, series[0], 1.0);

    this.chart.config.dataLoaded = true;
  }

  assess(data) {
    if (data.children) {
      data.value = 0;
      angular.forEach(data.children, child => {
        data.value += child.weight * this.assess(child);
      });
    }
    return data.value;
  }
}

/* vim:set sw=2 ts=2 sts=2: */
