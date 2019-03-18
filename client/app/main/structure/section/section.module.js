'use strict';

import angular from 'angular';
import 'ng-flow/dist/ng-flow-standalone';

import config from './section.config';
import SectionController from './section.controller';
import EditDialogController from './dialogs/edit/edit-dialog.controller';
import DeleteDialogController from './dialogs/delete/delete-dialog.controller';

export default angular
  .module('app.structure.section', ['flow'])
  .config(config)
  .controller('SectionController', SectionController)
  .controller('SectionEditController', EditDialogController)
  .controller('SectionDeleteController', DeleteDialogController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
