'use strict';

import angular from 'angular';

export default class EditDialogController {
  // data
  sensor = {};

  bridges = [];
  sections = [];
  types = [];

  // ngflow will be injected into here through its directive
  ngFlow = {flow: {}};

  // you can configure the ngflow from here
  ngFlowOptions = {
    target: 'api/files/upload',
    chunkSize: 10 * 1024 * 1024
    // maxChunkRetries          : 1,
    // simultaneousUploads      : 1,
    // testChunks               : false,
    // progressCallbacksInterval: 1000
  };

  /**@ngInject*/
  constructor($http, $q, $mdDialog, api, mode, sensor) {
    this.$http = $http;
    this.$q = $q;
    this.$mdDialog = $mdDialog;
    this.api = api;
    this.mode = mode;
    this.sensor = sensor;
  }

  $onInit() {
    this.$http.get('/api/sensors/types').then(
      response => { this.types = response.data; }
    );

    this.$q.all([
      this.api.bridges.query().$promise,
      this.api.sections.query().$promise
    ]).then(associates => {
      this.bridges = associates[0];
      this.sections = associates[1];

      if (this.mode === 'update') {
        angular.forEach(this.sections, section => {
          if (section._id === this.sensor.pid) {
            this.associatedSection = section;
          }
        });

        angular.forEach(this.bridges, bridge => {
          if (bridge._id === this.associatedSection.pid) {
            this.associatedBridge = bridge;
          }
        });
      }
    });

    if (!angular.isDefined(this.sensor.channels)) {
      this.sensor.channels = [{}];
    }
  }

  newChannel() {
    this.sensor.channels.push({});
  }

  /**
   * Search for sensor types
   *
   * @param {String} text
   */
  searchTypes(text) {
    if (!text) { return this.types; }

    text = angular.lowercase(text);
    return this.types.filter(type => (type.indexOf(text) != -1));
  }

  /**
   * Search for associated bridges
   *
   * @param {String} text
   */
  searchBridges(text) {
    if (!text) { return this.bridges; }

    text = angular.lowercase(text);
    return this.bridges.filter(bridge => (bridge.name.indexOf(text) != -1));
  }

  /**
   * Search for associated sections
   *
   * @param {String} text
   */
  searchSections(text) {
    if (!text) {
      return this.sections.filter(section => (section.pid == this.associatedBridge._id));
    }

    text = angular.lowercase(text);
    return this.sections.filter(section => (
      (section.name.indexOf(text) != -1) && (section.pid == this.associatedBridge._id)
    ));
  }

  /**
   * ngflow's file added callback
   * triggers when sensor image added to the uploader
   *
   * @param file
   */
  imageAdded(file) {
    this.sensor.image = {
      name: file.name,
      path: file.uniqueIdentifier
    };
  }

  /**
   * Upload the sensor image
   * automatically triggers when files added to the uploader
   */
  upload() {
    // set headers
    this.ngFlow.flow.opts.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      //   'X-XSRF-TOKEN': $cookies.get('XSRF-TOKEN')
    };

    this.ngFlow.flow.upload();
  }

  /**
   * ngflow's file upload success callback
   * triggers when single upload completed
   *
   * @param file
   * @param message
   */
  uploadSuccess(file, message) {}

  setCoordinate() {
    // this.sensor.axis = {x: 123, y: 456};
  }

  /**
   * Confirm the operation of creating sensor.
   */
  confirm() {
    this.$mdDialog.hide(this.sensor);
  }

  /**
   * Cancel the operation of creating sensor.
   */
  cancel() {
    this.$mdDialog.cancel();
  }
}

/* vim:set sw=2 ts=2 sts=2: */
