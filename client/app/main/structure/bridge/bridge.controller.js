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

  // pagination: default value of current page and page size
  currentPage = 1;
  pageSize = 10;

  constructor($scope, $state, $mdDialog, $document, api, socket, folders, Labels) {
    'ngInject';

    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.$document = $document;

    this.Bridges = api.bridges;
    this.socket = socket;

    this.folders = folders;
    this.labels = Labels.data;

    $scope.$on('$destroy', () => {
      this.socket.unsyncUpdates('bridge');
    });
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
   * Create a new bridge.
   *
   * @param {Event} event
   */
  createBridge(event) {
    this.$mdDialog.show({
      template: require('./dialogs/create/create-dialog.pug'),
      controller: 'BridgeCreateController',
      controllerAs: 'vm',
      locals: {
        mode: 'create',
        bridge: {}
      },
      parent: angular.element(this.$document.body),
      targetEvent: event,
    }).then(
      bridge => {
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
      () => {
        // dialog cancel callback
      }
    );
  }

  /**
   * Update an existed bridge.
   *
   * @param {Event} event
   */
  updateBridge(event) {
    this.$mdDialog.show({
      template: require('./dialogs/create/create-dialog.pug'),
      controller: 'BridgeCreateController',
      controllerAs: 'vm',
      locals: {
        mode: 'update',
        bridge: this.currentBridge
      },
      parent: angular.element(this.$document.body),
      targetEvent: event
    }).then(
      bridge => {
        this.Bridges.upsert(
          {id: bridge._id},
          bridge,
          (...res) => { // res: [value, headers(function), status, message]
            console.log(`manage to save bridge info to db with response status ${res[2]}`);
          },
          err => {
            console.log(`failed to save bridge info to db, error info: ${err}`);
          }
        );
      },
      () => {
        // dialog cancel callback
      }
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
            this.Bridges.delete(
              {id: bridge._id},
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
