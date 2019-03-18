'use strict';

import angular from 'angular';

export default angular.module('bshm.directives.ng-echarts', [])
  .directive('ngEcharts', function() {
    return {
      restrict: 'EA',
      scope: {
        option: '=',
        config: '='
      },
      controller($scope, $element, $attrs, $window) {
        'ngInject';

        function refreshChart() {
          let theme = ($scope.config && $scope.config.theme) ? $scope.config.theme : 'default';
          /* eslint-disable no-undef */
          // echart is imported from bootcdn
          let chart = echarts.init($element[0], theme);
          /* eslint-enable */

          if ($scope.config && $scope.config.dataLoaded === false) {
            chart.showLoading();
          }

          if ($scope.config && $scope.config.dataLoaded) {
            chart.setOption($scope.option);
            chart.resize();
            chart.hideLoading();
          }

          // register event handlers
          if ($scope.config && angular.isObject($scope.config.events)) {
            angular.forEach($scope.config.events, function(handler, event) {
              if (angular.isString(event) && angular.isFunction(handler)) {
                chart.on(angular.lowercase(event), handler);
              }
            });
          }
        }

        // refresh the chart when the window on resize
        $window.onresize = refreshChart;

        // watch changes on the chart's user define config
        // including events, theme, dataLoaded
        $scope.$watch(
          function() { return $scope.config; },
          function(value) {
            if (value) { refreshChart(); }
          },
          true
        );

        // watch changes on the chart's original option
        $scope.$watch(
          function() { return $scope.option; },
          function(value) {
            if (value) { refreshChart(); }
          },
          true
        );
      }
    };
  })
  .name;

/* vim:set sw=2 ts=2 sts=2: */
