'use strict';

describe('Component: trans', function() {
  // load the component's module
  beforeEach(module('bshmApp.trans'));

  var transComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    transComponent = $componentController('trans', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
