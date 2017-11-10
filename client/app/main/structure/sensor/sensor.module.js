'use strict';

import angular from 'angular';
import 'ng-flow/dist/ng-flow-standalone';

import config from './sensor.config';
import SensorController from './sensor.controller';
import EditDialogController from './dialogs/edit/edit-dialog.controller';
import DeleteDialogController from './dialogs/delete/delete-dialog.controller';

export default angular
  .module('app.structure.sensor', ['flow'])
  .config(config)
  .controller('SensorController', SensorController)
  .controller('SensorEditController', EditDialogController)
  .controller('SensorDeleteController', DeleteDialogController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
