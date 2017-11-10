/* eslint-disable consistent-this */
'use strict';

export default function() {
  return {
    bindToController: {
      total: '@'
    },
    controller: Controller,
    controllerAs: '$pageSelect'
  };

  function Controller($element, $scope) {
    'ngInject';

    var vm = this;

    var content = $element.find('md-content');

    // Data
    vm.pages = [];

    function getMin(pages, total) {
      return Math.min(pages, isFinite(total) && isPositive(total) ? total : 1);
    }

    function isPositive(number) {
      return number > 0;
    }

    function setPages(max) {
      if (vm.pages.length > max) {
        return vm.pages.splice(max);
      }

      for (var i = vm.pages.length; i < max; i++) {
        vm.pages.push(i + 1);
      }
    }

    content.on('scroll', function() {
      if ((content.prop('clientHeight') + content.prop('scrollTop')) >= content.prop('scrollHeight')) {
        $scope.$applyAsync(function() {
          setPages(getMin(vm.pages.length + 10, vm.total));
        });
      }
    });

    $scope.$watch('$pageSelect.total', function(total) {
      setPages(getMin(Math.max(vm.pages.length, 10), total));
    });

    $scope.$watch('$pagination.page', function(page) {
      for (var i = vm.pages.length; i < page; i++) {
        vm.pages.push(i + 1);
      }
    });
  }
}

/* vim:set sw=2 ts=2 sts=2: */
