'use strict';

describe('Component: FileManagerComponent', function() {
  // load the controller's module
  beforeEach(module('app.file-manager'));

  var FileManagerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    FileManagerComponent = $componentController('file-manager', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
