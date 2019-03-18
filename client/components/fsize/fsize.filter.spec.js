'use strict';

describe('Filter: fsize', function() {
  // load the filter's module
  beforeEach(module('bshmApp.fsize'));

  // initialize a new instance of the filter before each test
  var fsize;
  beforeEach(inject(function($filter) {
    fsize = $filter('fsize');
  }));

  it('should return the input prefixed with "fsize filter:"', function() {
    var text = 'angularjs';
    expect(fsize(text)).toBe('fsize filter: ' + text);
  });
});
