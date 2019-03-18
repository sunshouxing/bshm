'use strict';

import angular from 'angular';

export default function() {
  /* md-pagination directive controller */
  class Controller {
    constructor($scope, $attrs, $mdUtil) {
      'ngInject';

      this.$scope = $scope;
      this.$attrs = $attrs;
      this.$mdUtil = $mdUtil;
    }

    $onInit() {
      this.$scope.$watch('$pagination.limit', (newValue, oldValue) => {
        if (isNaN(newValue) || isNaN(oldValue) || newValue === oldValue) {
          return;
        }

        // find closest page from previous min
        this.page = Math.floor(((this.page * oldValue - oldValue) + newValue) / (this.isPositive(newValue) ? newValue : 1));
        this.onPaginationChange();
      });

      this.$scope.$watch('$pagination.total', (newValue, oldValue) => {
        if (isNaN(newValue) || newValue === oldValue) {
          return;
        }

        if (this.page > this.pages()) {
          this.last();
        }
      });
    }

    /**
     * Is given number positive?
     *
     * @param {Number} number
     */
    isPositive(number) {
      return parseInt(number, 10) > 0;
    }


    /**
     * Evaluate given expression
     *
     * @param {String} expression
     */
    eval(expression) {
      return this.$scope.$eval(expression);
    }

    /**
     * Go to the first page
     */
    first() {
      this.page = 1;
      this.onPaginationChange();
    }

    /**
     * Go to the last page
     */
    last() {
      this.page = this.pages();
      this.onPaginationChange();
    }

    /**
     * Go the next page
     */
    next() {
      this.page++;
      this.onPaginationChange();
    }

    /**
     * Go the previous page
     */
    previous() {
      this.page--;
      this.onPaginationChange();
    }

    /**
     * If the current page has next page?
     */
    hasNext() {
      return this.page * this.limit < this.total;
    }

    /**
     * If the current page has previous page?
     */
    hasPrevious() {
      return this.page > 1;
    }

    /**
     * Get the index value of current page's last item
     */
    max() {
      return this.hasNext() ? this.page * this.limit : this.total;
    }

    min() {
      return this.isPositive(this.total) ? this.page * this.limit - this.limit + 1 : 0;
    }

    onPaginationChange() {
      if (angular.isFunction(this.onPaginate)) {
        this.$mdUtil.nextTick(() => {
          this.onPaginate(this.page, this.limit);
        });
      }
    }

    pages() {
      return this.isPositive(this.total) ? Math.ceil(this.total / (this.isPositive(this.limit) ? this.limit : 1)) : 1;
    }

    showBoundaryLinks() {
      return this.$attrs.mdBoundaryLinks === '' || this.boundaryLinks;
    }

    showPageSelect() {
      return this.$attrs.mdPageSelect === '' || this.pageSelect;
    }
  }

  return {
    bindToController: {
      boundaryLinks: '=?mdBoundaryLinks',
      disabled: '=ngDisabled',
      limit: '=mdLimit',
      page: '=mdPage',
      pageSelect: '=?mdPageSelect',
      onPaginate: '=?mdOnPaginate',
      limitOptions: '=?mdLimitOptions',
      total: '@mdTotal'
    },
    compile(element) {
      element.addClass('md-table-pagination');
    },
    controller: Controller,
    controllerAs: '$pagination',
    restrict: 'E',
    scope: {},
    template: require('./md-pagination.pug')
  };
}

/* vim:set sw=2 ts=2 sts=2: */
