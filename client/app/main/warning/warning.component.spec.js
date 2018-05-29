'use strict';

describe('Component: WarningComponent', function() {
  // load the controller's module
  beforeEach(module('app.warning'));

  var WarningComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    WarningComponent = $componentController('warning', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
