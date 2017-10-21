'use strict';

import angular from 'angular';

/*@ngInject*/
export function fsizeFilter() {
  return function(bytes) {
    if (!bytes) {
      return '';
    }

    let s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let e = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, e)).toFixed(2)} ${s[e]}`;
  };
}

export default angular.module('bshmApp.fsize', [])
  .filter('fsize', fsizeFilter)
  .name;
