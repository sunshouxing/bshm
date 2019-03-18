'use strict';

import angular from 'angular';

import config from './structure.config';
import bridge from './bridge/bridge.module';
import section from './section/section.module';
import sensor from './sensor/sensor.module';

export default angular
  .module('app.structure', [bridge, section, sensor])
  .config(config)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
