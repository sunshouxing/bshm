'use strict';

describe('Component: MonitorComponent', function() {
  // load the controller's module
  beforeEach(module('app.monitor'));

  var MonitorComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MonitorController('monitor', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
