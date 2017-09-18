'use strict';

import angular from 'angular';

export default class BridgeController {
  // data
  folders = [];
  bridges = [];
  selectedBridges = [];
  currentBridge = null;
  loadingBridges = true;
  colors = ['blue-bg', 'blue-grey-bg', 'orange-bg', 'pink-bg', 'purple-bg'];

  constructor($state, $mdDialog, $document, api, folders, Labels) {
    'ngInject';

    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.api = api;

    this.folders = folders;
    this.labels = Labels.data;
  }

  $onInit() {
    this.api.bridges.query(
      // success callback
      bridges => {
        // set bridge list data
        this.bridges = bridges;

        // hide the loading screen
        this.loadingBridges = false;

        // change to bridge detail view if needed
        if (this.$state.params.id) {
          for (let i = 0; i < this.bridges.length; i++) {
            if (this.bridges[i]._id === this.$state.params.id) {
              this.inspectDetail(this.bridges[i]);
              break;
            }
          }
        }
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
    if (event) {
      event.stopPropagation();
    }

    let index = this.selectedBridges.indexOf(bridge);
    if (index > -1) {
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

    if (angular.isUndefined(key) && angular.isUndefined(value)) {
      for (let i = 0; i < this.bridges.length; i++) {
        this.selectedBridges.push(this.bridges[i]);
      }
    }

    if (angular.isDefined(key) && angular.isDefined(value)) {
      for (let i = 0; i < this.bridges.length; i++) {
        if (this.bridges[i][key] === value) {
          this.selectedBridges.push(this.bridges[i]);
        }
      }
    }
  }

  /**
   * deselect bridges
   */
  deselectBridges() {
    this.selectedBridges = [];
  }

  /**
   * toggle select bridges
   */
  toggleSelectBridges() {
    if (this.selectedBridges.length > 0) {
      this.deselectBridges();
    } else {
      this.selectBridges();
    }
  }

  /**
   * open bridge detail view
   *
   * @param bridge
   */
  inspectDetail(bridge) {
    // set the read status on the bridge
    bridge.read = true;

    // assign bridge as the current bridge
    this.currentBridge = bridge;

    // update the state without reloading the controller
    this.$state.go('app.structure.bridge.detail', {id: bridge._id});
  }

  /**
   * open bridge list view
   */
  surveyBridges() {
    this.currentBridge = null;

    // update the state without reloading the controller
    this.$state.go('app.structure.bridge');
  }

  /**
   * open compose dialog
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
