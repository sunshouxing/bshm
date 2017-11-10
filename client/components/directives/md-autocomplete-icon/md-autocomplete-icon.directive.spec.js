'use strict';

describe('Directive: mdAutocompleteIcon', function() {
  // load the directive's module
  beforeEach(module('bshm.directives'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<md-autocomplete-icon></md-autocomplete-icon>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mdAutocompleteIcon directive');
  }));
});
