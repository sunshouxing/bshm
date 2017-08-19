'use strict';

export default function IndexController(fuseTheming) {
  'ngInject';

  // Data
  this.themes = fuseTheming.themes;
}
