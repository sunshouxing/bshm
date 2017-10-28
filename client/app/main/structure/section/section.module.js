'use strict';

import angular from 'angular';

import config from './section.config';
import SectionController from './section.controller';

export default angular
  .module('app.structure.section', [])
  .config(config)
  .controller('SectionController', SectionController)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
