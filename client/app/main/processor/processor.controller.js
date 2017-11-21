'use strict';

import angular from 'angular';

export default class ProcessorController {
  /*********************
   *       Data        *
   *********************/
  folders = [];
  processors = [];
  selectedProcessors = [];
  currentProcessor = null;
  loadingProcessors = true;
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
    this.api = api;
    this.folders = folders;
    this.labels = Labels.data;
  }

  $onInit() {
    this.api.processors.query(
      // success callback
      processors => {
        // set processor list data
        this.processors = processors;
        this.socket.syncUpdates('processor', this.processors);

        // hide the loading screen
        this.loadingProcessors = false;

        // change to processor detail view if needed
        if (this.$state.params.id) {
          for (let i = 0; i < this.processors.length; i++) {
            if (this.processors[i]._id === this.$state.params.id) {
              this.inspectDetail(this.processors[i]);
              break;
            }
          }
        }
      }
    );

    this.$scope.$on('$destroy', () => {
      this.socket.unsyncUpdates('processor');
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
   * whether the given processor is selected
   *
   * @param processor
   */
  isSelected(processor) {
    return this.selectedProcessors.indexOf(processor) > -1;
  }

  /**
   * Toggle selected status of the processor
   *
   * @param {Object} processor
   * @param {Event} event
   */
  toggleSelectProcessor(processor, event) {
    if (event) {
      event.stopPropagation();
    }

    let index = this.selectedProcessors.indexOf(processor);
    if (index > -1) {
      this.selectedProcessors.splice(index, 1);
    } else {
      this.selectedProcessors.push(processor);
    }
  }

  /**
   * Select processors. if key/value pair given, processors will be tested against them.
   *
   * @param {String} [key]
   * @param {String} [value]
   */
  selectProcessors(key, value) {
    // make sure the current selection is cleared
    // before trying to select new processors
    this.selectedProcessors = [];

    if (angular.isUndefined(key) && angular.isUndefined(value)) {
      for (let i = 0; i < this.processors.length; i++) {
        this.selectedProcessors.push(this.processors[i]);
      }
    }

    if (angular.isDefined(key) && angular.isDefined(value)) {
      for (let i = 0; i < this.processors.length; i++) {
        if (this.processors[i][key] === value) {
          this.selectedProcessors.push(this.processors[i]);
        }
      }
    }
  }

  /**
   * deselect processors
   */
  deselectProcessors() {
    this.selectedProcessors = [];
  }

  /**
   * toggle select processors
   */
  toggleSelectProcessors() {
    if (this.selectedProcessors.length > 0) {
      this.deselectProcessors();
    } else {
      this.selectProcessors();
    }
  }

  /**
   * Open processor detail view
   *
   * @param {Object} processor
   */
  inspectDetail(processor) {
    // set the read status on the processor
    processor.read = true;

    // assign processor as the current processor
    this.currentProcessor = processor;

    // update the state without reloading the controller
    this.$state.go('app.structure.processor.detail', {id: processor._id});
  }

  /**
   * Open processor list view
   */
  surveyProcessors() {
    this.currentProcessor = null;

    // update the state without reloading the controller
    this.$state.go('app.processor');
  }

  /**
   * Create a new processor.
   *
   * @param {Event} event
   */
  createProcessor(event) {
    this.$mdDialog.show({
      template: require('./dialogs/edit/edit-dialog.pug'),
      controller: 'ProcessorEditController',
      controllerAs: 'vm',
      locals: {
        mode: 'create',
        processor: {}
      },
      parent: angular.element(this.$document.body),
      targetEvent: event,
    }).then(
      processor => { // dialog confirm callback
        this.Processors.save(
          processor,
          (...res) => { // res incluces [value, responseHeaders(function), status, message]
            console.log(`manage to save processor info to db with response status ${res[2]}`);
          },
          err => {
            console.log(`failed to save processor info to db, error info: ${err}`);
          }
        );
      },
      () => { /* dialog cancel callback */ }
    );
  }

  /**
   * Update an existed processor.
   *
   * @param {Event} event
   */
  updateProcessor(event) {
    this.$mdDialog.show({
      template: require('./dialogs/edit/edit-dialog.pug'),
      controller: 'ProcessorEditController',
      controllerAs: 'vm',
      locals: {
        mode: 'update',
        processor: angular.copy(this.currentProcessor)
      },
      parent: angular.element(this.$document.body),
      targetEvent: event
    }).then(
      processor => { // dialog confirm callback
        this.api.processors.update(
          processor,
          (...res) => {
            this.currentProcessor = res[0];
          }
        );
      },
      () => { /* dialog cancel callback */ }
    );
  }

  /**
   * Delete selected processors or current processor
   *
   * @param {Event} event
   */
  deleteProcessors(event) {
    let processors = [];
    if (this.$state.current.name == 'app.structure.processor') {
      angular.copy(this.selectedProcessors, processors);
    } else {
      processors.push(angular.copy(this.currentProcessor));
    }

    this.$mdDialog.show({
      controller: 'ProcessorDeleteController',
      controllerAs: 'vm',
      locals: {
        processors
      },
      template: require('./dialogs/delete/delete-dialog.pug'),
      parent: angular.element(this.$document.body),
      targetEvent: event,
      clickOutsideToClose: false
    }).then(
      confirmed => { // dialog confirm callback
        confirmed.filter(processor => processor.delete).forEach(processor => {
          this.api.processors.delete(
            {id: processor._id},
            () => { // delete success callback
              if (this.$state.current.name == 'app.processor.detail') {
                this.surveyProcessors();
              }
            }
          );
        });
      },
      () => { /* dialog cancel callback */ }
    );
  }

  onPaginate(page, limit) {
    console.log(`Current page: ${page}, page size: ${limit}`);
  }
}
