'use strict';

import angular from 'angular';

import SectionMonitor from './section.controller';

export default angular
  .module('app.monitor.section', [])
  .controller('SectionMonitor', SectionMonitor)
  .name;

/* vim:set sw=2 ts=2 sts=2: */
