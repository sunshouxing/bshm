
'use strict';

import angular from 'angular';

import mdPagination from './md-pagination.directive';
import virtualPageSelect from './virtual-page-select.directive';

export default angular
  .module('bshm.directives.pagination', [])
  .config(config)
  .directive('virtualPageSelect', virtualPageSelect)
  .directive('mdPagination', mdPagination)
  .name;

function config($translatePartialLoaderProvider) {
  'ngInject';
  $translatePartialLoaderProvider.addPart('components/directives/md-pagination');
}

/* vim:set sw=2 ts=2 sts=2: */
