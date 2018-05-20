'use strict';

import angular from 'angular';

import SensorMonitor from './sensor.controller';

export default angular
  .module('app.monitor.sensor', [])
  .controller('SensorMonitor', SensorMonitor)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
