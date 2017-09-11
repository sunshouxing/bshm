'use strict';

import angular from 'angular';

export default class BridgeController {
  // data
  currentThread = null;
  loadingThreads = true;

  constructor($state, $mdDialog, $document, msApi, Folders, Labels) {
    'ngInject';

    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.msApi = msApi;

    this.folders = Folders.data;
    this.labels = Labels.data;
  }

  $onInit() {
    let apiName = 'mail.folder.inbox@get';

    this.msApi.request(apiName).then(
      // success callback
      response => {
        this.threads = response.data;
        this.loadingThreads = false;
      }
    );
  }

  /**
   * Open thread
   *
   * @param thread
   */
  openThread(thread) {
    // set the read status on the thread
    thread.read = true;

    // assign thread as the current thread
    this.currentThread = thread;

    // update the state without reloading the controller
    this.$state.go('app.structure.bridge.detail', {id: thread.id});
  }

  closeThread() {
    this.currentThread = null;

    // update the state without reloading the controller
    this.$state.go('app.structure.bridge.list');
  }

  /**
   * Open compose dialog
   *
   * @param ev
   */
  composeDialog(ev) {
    this.$mdDialog.show({
      controller: 'BridgeCreateController',
      controllerAs: 'vm',
      locals: {
        selectedMail: undefined
      },
      template: require('./dialogs/create/create-dialog.pug'),
      parent: angular.element(this.$document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }

}
