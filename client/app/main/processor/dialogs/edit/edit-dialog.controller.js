'use strict';

import angular from 'angular';

export default class EditDialogController {
  // data
  processor = {};

  bridges = [];
  sections = [];
  types = [];

  // ngflow will be injected into here through its directive
  ngFlow = {
    flow: {},
    options: { // you can config the ngflow here
      target: 'api/files/upload'
    }
  };

  /**@ngInject*/
  constructor($http, $q, $mdDialog, api, mode, processor) {
    this.$http = $http;
    this.$q = $q;
    this.$mdDialog = $mdDialog;
    this.api = api;
    this.mode = mode;
    this.processor = processor;
  }

  $onInit() {
    this.$http.get('/api/processors/types').then(
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
          if (section._id === this.processor.pid) {
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

    if (!angular.isDefined(this.processor.channels)) {
      this.processor.channels = [{}];
    }
  }

  /**
   * Create a new processor channel.
   */
  newChannel() {
    this.processor.channels.push({});
  }

  /**
   * Delete a processor channel from given index.
   *
   * @param {Number} index
   */
  deleteChannel(index) {
    this.processor.channels.splice(index, 1);
  }

  /**
   * Search for processor types
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
   * Upload the processor image
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
   */
  uploadSuccess(file) {
    this.processor.image = {
      name: file.name,
      path: file.uniqueIdentifier
    };
  }

  setCoordinate() {
    // this.processor.axis = {x: 123, y: 456};
  }

  /**
   * Confirm the operation of creating processor.
   */
  confirm() {
    this.$mdDialog.hide(this.processor);
  }

  /**
   * Cancel the operation of creating processor.
   */
  cancel() {
    this.$mdDialog.cancel();
  }
}

/* vim:set sw=2 ts=2 sts=2: */
