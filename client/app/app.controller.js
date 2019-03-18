'use strict';

export default class IndexController {
  constructor(fuseTheming) {
    'ngInject';

    this.themes = fuseTheming.themes;
  }
}

/* vim:set sw=2 ts=2 sts=2: */
