'use strict';

import angular from 'angular';

export default angular.module('bshmApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
