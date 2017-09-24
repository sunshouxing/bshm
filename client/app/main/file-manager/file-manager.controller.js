'use strict';

export default class FileManagerController {
  // data

  /**@ngInject*/
  constructor($mdSidenav, documents) {
    this.$mdSidenav = $mdSidenav;
    this.documents = documents;
  }

  $onInit() {
    this.path = this.documents.data.path;
    this.folders = this.documents.data.folders;
    this.files = this.documents.data.files;

    this.selected = this.files[0];
  }

  toggleSidenav(sidenavId) {
    this.$mdSidenav(sidenavId).toggle();
  }

  select(item) {
    this.selected = item;
  }
}

/* vim:set sw=2 ts=2 sts=2: */
