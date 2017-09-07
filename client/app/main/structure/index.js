'use strict';

import angular from 'angular';

import config from './structure.config';
import bridge from './bridge/bridge.module';

export default angular
  .module('app.structure', [bridge])
  .config(config)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
