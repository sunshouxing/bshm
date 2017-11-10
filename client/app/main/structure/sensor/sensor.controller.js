'use strict';

import angular from 'angular';

export default class SensorController {
  /*********************
   *       Data        *
   *********************/
  folders = [];
  sensors = [];
  selectedSensors = [];
  currentSensor = null;
  loadingSensors = true;
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
    this.Sensors = api.sensors;
    this.folders = folders;
    this.labels = Labels.data;
  }

  $onInit() {
    this.Sensors.query(
      // success callback
      sensors => {
        // set sensor list data
        this.sensors = sensors;
        this.socket.syncUpdates('sensor', this.sensors);

        // hide the loading screen
        this.loadingSensors = false;

        // change to sensor detail view if needed
        if (this.$state.params.id) {
          for (let i = 0; i < this.sensors.length; i++) {
            if (this.sensors[i]._id === this.$state.params.id) {
              this.inspectDetail(this.sensors[i]);
              break;
            }
          }
        }
      }
    );

    this.$scope.$on('$destroy', () => {
      this.socket.unsyncUpdates('sensor');
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
   * whether the given sensor is selected
   *
   * @param sensor
   */
  isSelected(sensor) {
    return this.selectedSensors.indexOf(sensor) > -1;
  }

  /**
   * Toggle selected status of the sensor
   *
   * @param {Object} sensor
   * @param {Event} event
   */
  toggleSelectSensor(sensor, event) {
    if (event) {
      event.stopPropagation();
    }

    let index = this.selectedSensors.indexOf(sensor);
    if (index > -1) {
      this.selectedSensors.splice(index, 1);
    } else {
      this.selectedSensors.push(sensor);
    }
  }

  /**
   * Select sensors. if key/value pair given, sensors will be tested against them.
   *
   * @param {String} [key]
   * @param {String} [value]
   */
  selectSensors(key, value) {
    // make sure the current selection is cleared
    // before trying to select new sensors
    this.selectedSensors = [];

    if (angular.isUndefined(key) && angular.isUndefined(value)) {
      for (let i = 0; i < this.sensors.length; i++) {
        this.selectedSensors.push(this.sensors[i]);
      }
    }

    if (angular.isDefined(key) && angular.isDefined(value)) {
      for (let i = 0; i < this.sensors.length; i++) {
        if (this.sensors[i][key] === value) {
          this.selectedSensors.push(this.sensors[i]);
        }
      }
    }
  }

  /**
   * deselect sensors
   */
  deselectSensors() {
    this.selectedSensors = [];
  }

  /**
   * toggle select sensors
   */
  toggleSelectSensors() {
    if (this.selectedSensors.length > 0) {
      this.deselectSensors();
    } else {
      this.selectSensors();
    }
  }

  /**
   * Open sensor detail view
   *
   * @param {Object} sensor
   */
  inspectDetail(sensor) {
    // set the read status on the sensor
    sensor.read = true;

    // assign sensor as the current sensor
    this.currentSensor = sensor;

    // update the state without reloading the controller
    this.$state.go('app.structure.sensor.detail', {id: sensor._id});
  }

  /**
   * Open sensor list view
   */
  surveySensors() {
    this.currentSensor = null;

    // update the state without reloading the controller
    this.$state.go('app.structure.sensor');
  }

  /**
   * Create a new sensor.
   *
   * @param {Event} event
   */
  createSensor(event) {
    this.$mdDialog.show({
      template: require('./dialogs/edit/edit-dialog.pug'),
      controller: 'SensorEditController',
      controllerAs: 'vm',
      locals: {
        mode: 'create',
        sensor: {}
      },
      parent: angular.element(this.$document.body),
      targetEvent: event,
    }).then(
      sensor => { // dialog confirm callback
        this.Sensors.save(
          sensor,
          (...res) => { // res incluces [value, responseHeaders(function), status, message]
            console.log(`manage to save sensor info to db with response status ${res[2]}`);
          },
          err => {
            console.log(`failed to save sensor info to db, error info: ${err}`);
          }
        );
      },
      () => { /* dialog cancel callback */ }
    );
  }

  /**
   * Update an existed sensor.
   *
   * @param {Event} event
   */
  updateSensor(event) {
    this.$mdDialog.show({
      template: require('./dialogs/edit/edit-dialog.pug'),
      controller: 'SensorEditController',
      controllerAs: 'vm',
      locals: {
        mode: 'update',
        sensor: angular.copy(this.currentSensor)
      },
      parent: angular.element(this.$document.body),
      targetEvent: event
    }).then(
      sensor => { // dialog confirm callback
        this.Sensors.update(
          {id: sensor._id}, sensor,
          (...res) => {
            this.currentSensor = res[0];
          }
        );
      },
      () => { /* dialog cancel callback */ }
    );
  }

  /**
   * Delete selected sensors or current sensor
   *
   * @param {Event} event
   */
  deleteSensors(event) {
    let sensors = [];
    if (this.$state.current.name == 'app.structure.sensor') {
      angular.copy(this.selectedSensors, sensors);
    } else {
      sensors.push(angular.copy(this.currentSensor));
    }

    this.$mdDialog.show({
      controller: 'SensorDeleteController',
      controllerAs: 'vm',
      locals: {
        sensors
      },
      template: require('./dialogs/delete/delete-dialog.pug'),
      parent: angular.element(this.$document.body),
      targetEvent: event,
      clickOutsideToClose: false
    }).then(
      confirmed => {
        angular.forEach(confirmed, sensor => {
          if (sensor.delete) {
            sensor.$delete(
              {id: sensor._id},
              () => { // success callback
                if (this.$state.current.name == 'app.structure.sensor.detail') {
                  this.currentSensor = null;
                  this.$state.go('app.structure.sensor');
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
