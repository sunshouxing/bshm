'use strict';

import angular from 'angular';

import config from './bridge.config';
import BridgeController from './bridge.controller';
import BridgeCreateController from './dialogs/create/create-dialog.controller';
import BridgeDeleteController from './dialogs/delete/delete-dialog.controller';

export default angular
  .module('app.structure.bridge', [])
  .config(config)
  .controller('BridgeController', BridgeController)
  .controller('BridgeCreateController', BridgeCreateController)
  .controller('BridgeDeleteController', BridgeDeleteController)
  .name;