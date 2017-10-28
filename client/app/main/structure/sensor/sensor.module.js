'use strict';

import angular from 'angular';

import config from './sensor.config';
import SensorController from './sensor.controller';

export default angular
  .module('app.structure.sensor', [])
  .config(config)
  .controller('SensorController', SensorController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
