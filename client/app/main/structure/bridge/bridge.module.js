'use strict';

import angular from 'angular';

import config from './bridge.config';
import BridgeController from './bridge.controller';

export default angular
  .module('app.structure.bridge', [])
  .config(config)
  .controller('BridgeController', BridgeController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
