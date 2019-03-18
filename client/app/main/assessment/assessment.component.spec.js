'use strict';

describe('Component: AssessmentComponent', function() {
  // load the controller's module
  beforeEach(module('app.assessment'));

  var FileManagerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AssessmentController('assessment', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
