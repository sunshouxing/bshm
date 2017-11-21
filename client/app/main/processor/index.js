'use strict';

import angular from 'angular';
import 'ng-flow/dist/ng-flow-standalone';

import config from './processor.config';
import ProcessorController from './processor.controller';
import EditDialogController from './dialogs/edit/edit-dialog.controller';
import DeleteDialogController from './dialogs/delete/delete-dialog.controller';

export default angular
  .module('app.processing-unit', ['flow'])
  .config(config)
  .controller('ProcessorController', ProcessorController)
  .controller('ProcessorEditController', EditDialogController)
  .controller('ProcessorDeleteController', DeleteDialogController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
