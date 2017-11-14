'use strict';

import angular from 'angular';

export default class BridgeController {
  /*********************
   *       Data        *
   *********************/
  folders = [];
  bridges = [];
  selectedBridges = [];
  currentBridge = null;
  loadingBridges = true;
  colors = ['blue-bg', 'blue-grey-bg', 'orange-bg', 'pink-bg', 'purple-bg'];

  pagination = {size: 10, page: 1};

  /*********************
   *     Methods       *
   *********************/
  constructor($scope, $state, $document, $translate, $mdDialog, $mdSidenav, socket, api, folders, Labels) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;
    this.$document = $document;
    this.$translate = $translate;
    this.$mdDialog = $mdDialog;
    this.$mdSidenav = $mdSidenav;

    this.socket = socket;
    this.Bridges = api.bridges;
    this.folders = folders;
    this.labels = Labels.data;
  }

  $onInit() {
    this.Bridges.query(
      // success callback
      bridges => {
        // set bridge list data
        this.bridges = bridges;
        this.socket.syncUpdates('bridge', this.bridges);

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

    this.$scope.$on('$destroy', () => {
      this.socket.unsyncUpdates('bridge');
    });
  }

  /**
   * Toggle main sidenav.
   *
   * @param {String} sidenavId
   */
  toggleSidenav(sidenavId) {
    this.$mdSidenav(sidenavId).toggle();
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
   * Toggle selected status of the bridge
   *
   * @param {Object} bridge
   * @param {Event} event
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
   * Select bridges. if key/value pair given, bridges will be tested against them.
   *
   * @param {String} [key]
   * @param {String} [value]
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
   * Open bridge detail view
   *
   * @param {Object} bridge
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
   * Open bridge list view
   */
  surveyBridges() {
    this.currentBridge = null;

    // update the state without reloading the controller
    this.$state.go('app.structure.bridge');
  }

  /**
   * Create a new bridge.
   *
   * @param {Event} event
   */
  createBridge(event) {
    this.$mdDialog.show({
      template: require('./dialogs/edit/edit-dialog.pug'),
      controller: 'EditDialogController',
      controllerAs: 'vm',
      locals: {
        mode: 'create',
        bridge: {}
      },
      parent: angular.element(this.$document.body),
      targetEvent: event,
    }).then(
      bridge => { // dialog confirm callback
        this.Bridges.save(
          bridge,
          (...res) => { // res incluces [value, responseHeaders(function), status, message]
            console.log(`manage to save bridge info to db with response status ${res[2]}`);
          },
          err => {
            console.log(`failed to save bridge info to db, error info: ${err}`);
          }
        );
      },
      () => { /* dialog cancel callback */ }
    );
  }

  /**
   * Update an existed bridge.
   *
   * @param {Event} event
   */
  updateBridge(event) {
    this.$mdDialog.show({
      template: require('./dialogs/edit/edit-dialog.pug'),
      controller: 'BridgeEditController',
      controllerAs: 'vm',
      locals: {
        mode: 'update',
        bridge: angular.copy(this.currentBridge)
      },
      parent: angular.element(this.$document.body),
      targetEvent: event
    }).then(
      bridge => { // dialog confirm callback
        bridge.$update(
          (...res) => {
            this.currentBridge = res[0];
          }
        );
      },
      () => { /* dialog cancel callback */ }
    );
  }

  /**
   * Delete selected bridges or current bridge
   *
   * @param {Event} event
   */
  deleteBridges(event) {
    let bridges = [];
    if (this.$state.current.name == 'app.structure.bridge') {
      angular.copy(this.selectedBridges, bridges);
    } else {
      bridges.push(angular.copy(this.currentBridge));
    }

    this.$mdDialog.show({
      controller: 'BridgeDeleteController',
      controllerAs: 'vm',
      locals: {
        bridges
      },
      template: require('./dialogs/delete/delete-dialog.pug'),
      parent: angular.element(this.$document.body),
      targetEvent: event,
      clickOutsideToClose: false
    }).then(
      confirmed => {
        angular.forEach(confirmed, bridge => {
          if (bridge.delete) {
            bridge.$delete(
              () => { // success callback
                if (this.$state.current.name == 'app.structure.bridge.detail') {
                  this.currentBridge = null;
                  this.$state.go('app.structure.bridge');
                }
              }
            );
          }
        });
      },
      () => {}
    );
  }

  onPaginate(page, limit) {
    console.log(`Current page: ${page}, page size: ${limit}`);
  }
}
