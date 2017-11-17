'use strict';

import angular from 'angular';

export default class SectionController {
  /*********************
   *       Data        *
   *********************/
  sections = [];
  selectedSections = [];
  currentSection = null;

  loading = true;
  folders = [];
  colors = ['blue-bg', 'blue-grey-bg', 'orange-bg', 'pink-bg', 'purple-bg'];

  pagination = {size: 10, page: 1};

  /*********************
   *     Methods       *
   *********************/
  constructor($scope, $state, $document, $translate, $mdDialog, $mdSidenav, socket, api, folders, Labels) {
    'ngInject';

    this.$scope = $scope;
    this.$document = $document;
    this.$state = $state;
    this.$document = $document;
    this.$translate = $translate;
    this.$mdDialog = $mdDialog;
    this.$mdSidenav = $mdSidenav;

    this.socket = socket;
    this.Sections = api.sections;
    this.folders = folders;
    this.labels = Labels.data;
  }

  $onInit() {
    this.Sections.query(
      // success callback
      sections => {
        // set section list data
        this.sections = sections;
        this.socket.syncUpdates('section', this.sections);

        // hide the loading screen
        this.loading = false;

        // change to section detail view if needed
        if (this.$state.params.id) {
          for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i]._id === this.$state.params.id) {
              this.inspectDetail(this.sections[i]);
              break;
            }
          }
        }
      }
    );

    this.$scope.$on('$destroy', () => {
      this.socket.unsyncUpdates('section');
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
   * whether the given section is selected
   *
   * @param section
   */
  isSelected(section) {
    return this.selectedSections.indexOf(section) > -1;
  }

  /**
   * Toggle selected status of the section
   *
   * @param {Object} section
   * @param {Event} event
   */
  toggleSelectSection(section, event) {
    if (event) {
      event.stopPropagation();
    }

    let index = this.selectedSections.indexOf(section);
    if (index > -1) {
      this.selectedSections.splice(index, 1);
    } else {
      this.selectedSections.push(section);
    }
  }

  /**
   * Select sections. if key/value pair given, sections will be tested against them.
   *
   * @param {String} [key]
   * @param {String} [value]
   */
  selectSections(key, value) {
    // make sure the current selection is cleared
    // before trying to select new sections
    this.selectedSections = [];

    if (angular.isUndefined(key) && angular.isUndefined(value)) {
      for (let i = 0; i < this.sections.length; i++) {
        this.selectedSections.push(this.sections[i]);
      }
    }

    if (angular.isDefined(key) && angular.isDefined(value)) {
      for (let i = 0; i < this.sections.length; i++) {
        if (this.sections[i][key] === value) {
          this.selectedSections.push(this.sections[i]);
        }
      }
    }
  }

  /**
   * deselect sections
   */
  deselectSections() {
    this.selectedSections = [];
  }

  /**
   * toggle select sections
   */
  toggleSelectSections() {
    if (this.selectedSections.length > 0) {
      this.deselectSections();
    } else {
      this.selectSections();
    }
  }

  /**
   * Open section detail view
   *
   * @param {Object} section
   */
  inspectDetail(section) {
    // set the read status on the section
    section.read = true;

    // assign section as the current section
    this.currentSection = section;

    // update the state without reloading the controller
    this.$state.go('app.structure.section.detail', {id: section._id});
  }

  /**
   * Open section list view
   */
  surveySections() {
    this.currentSection = null;

    // update the state without reloading the controller
    this.$state.go('app.structure.section');
  }

  /**
   * Create a new section.
   *
   * @param {Event} event
   */
  createSection(event) {
    this.$mdDialog.show({
      template: require('./dialogs/edit/edit-dialog.pug'),
      controller: 'SectionEditController',
      controllerAs: 'vm',
      locals: {
        mode: 'create',
        section: {}
      },
      parent: angular.element(this.$document.body),
      targetEvent: event,
    }).then(
      section => { // dialog confirm callback
        this.Sections.save(
          section,
          (...res) => { // res incluces [value, responseHeaders(function), status, message]
            console.log(`manage to save section info to db with response status ${res[2]}`);
          },
          err => {
            console.log(`failed to save section info to db, error info: ${err}`);
          }
        );
      },
      () => { /* dialog cancel callback */ }
    );
  }

  /**
   * Update an existed section.
   *
   * @param {Event} event
   */
  updateSection(event) {
    this.$mdDialog.show({
      template: require('./dialogs/edit/edit-dialog.pug'),
      controller: 'SectionEditController',
      controllerAs: 'vm',
      locals: {
        mode: 'update',
        section: angular.copy(this.currentSection)
      },
      parent: angular.element(this.$document.body),
      targetEvent: event
    }).then(
      section => { // dialog confirm callback
        section.$update(
          (...res) => {
            this.currentSection = res[0];
          }
        );
      },
      () => { // dialog cancel callback
      }
    );
  }

  /**
   * Delete selected sections or current section
   *
   * @param {Event} event
   */
  deleteSections(event) {
    let sections = [];
    if (this.$state.current.name == 'app.structure.section') {
      angular.copy(this.selectedSections, sections);
    } else {
      sections.push(angular.copy(this.currentSection));
    }

    this.$mdDialog.show({
      controller: 'SectionDeleteController',
      controllerAs: 'vm',
      locals: {
        sections
      },
      template: require('./dialogs/delete/delete-dialog.pug'),
      parent: angular.element(this.$document.body),
      targetEvent: event,
      clickOutsideToClose: false
    }).then(
      confirmed => {
        angular.forEach(confirmed, section => {
          if (section.delete) {
            section.$delete(
              () => { // success callback
                if (this.$state.current.name == 'app.structure.section.detail') {
                  this.currentSection = null;
                  this.$state.go('app.structure.section');
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
