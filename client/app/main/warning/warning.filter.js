'use strict';

export function warningLevelFilter($translate) {
  'ngInject';

  return num => [
    $translate.instant('WARNING.YELLOW_WARNING'),
    $translate.instant('WARNING.RED_WARNING')
  ][num];
}

export function warningStatusFilter($translate) {
  'ngInject';

  return num => [
    $translate.instant('WARNING.UNHANDLED'),
    $translate.instant('WARNING.HANDLING'),
    $translate.instant('WARNING.HANDLED')
  ][num];
}

/* vim:set sw=2 ts=2 sts=2: */
