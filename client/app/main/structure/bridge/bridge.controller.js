'use strict';

import angular from 'angular';

export default class BridgeController {
  // data
  folders = [];
  bridges = [];
  selectedBridges = [];
  currentThread = null;
  loadingThreads = true;

  constructor($state, $mdDialog, $document, msApi, folders, Labels) {
    'ngInject';

    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.msApi = msApi;

    this.folders = folders;
    this.labels = Labels.data;
  }

  $onInit() {
    let apiName = 'mail.folder.inbox@get';

    this.msApi.request(apiName).then(
      // success callback
      response => {
        this.bridges = response.data;
        this.loadingThreads = false;
      }
    );
  }

  /**
   * whether the given bridge is selected
   *
   * @param bridge
   */
  isSelected(bridge) {
    return this.selectedBridges.indexOf(bridge) > -1;
  }

  /**
   * toggle selected status of the bridge
   *
   * @param bridge
   * @param event
   */
  toggleSelectBridge(bridge, event) {
    if(event) {
      event.stopPropagation();
    }

    let index = this.selectedBridges.indexOf(bridge);
    if(index > -1) {
      this.selectedBridges.splice(index, 1);
    } else {
      this.selectedBridges.push(bridge);
    }
  }

  /**
   * select bridges. if key/value pair given, bridges will be tested against them.
   *
   * @param [key]
   * @param [value]
   */
  selectBridges(key, value) {
    // make sure the current selection is cleared
    // before trying to select new bridges
    this.selectedBridges = [];

    if(angular.isUndefined(key) && angular.isUndefined(value)) {
      for(let i = 0; i < this.bridges.length; i++) {
        this.selectedBridges.push(this.bridges[i]);
      }
    }

    if(angular.isDefined(key) && angular.isDefined(value)) {
      for(let i = 0; i < this.bridges.length; i++) {
        if(this.bridges[i][key] === value) {
          this.selectedBridges.push(this.bridges[i]);
        }
      }
    }
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

  /**
   * delete selected bridges or current bridge
   *
   * @param event
   */
  deleteBridges(event) {
    console.log('deleting bridges');

    this.$mdDialog.show({
      controller: 'BridgeDeleteController',
      controllerAs: 'vm',
      template: require('./dialogs/delete/delete-dialog.pug'),
      parent: angular.element(this.$document.body),
      targetEvent: event,
      clickOutsideToClose: true
    });
  }

}
