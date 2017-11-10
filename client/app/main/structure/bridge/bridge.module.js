'use strict';

import angular from 'angular';
import 'ng-flow/dist/ng-flow-standalone';

import config from './bridge.config';
import BridgeController from './bridge.controller';
import EditDialogController from './dialogs/edit/edit-dialog.controller';
import DeleteDialogController from './dialogs/delete/delete-dialog.controller';

export default angular
  .module('app.structure.bridge', ['flow'])
  .config(config)
  .controller('BridgeController', BridgeController)
  .controller('EditDialogController', EditDialogController)
  .controller('DeleteDialogController', DeleteDialogController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
