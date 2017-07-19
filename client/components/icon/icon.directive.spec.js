'use strict';

describe('Directive: icon', function() {
  // load the directive's module
  beforeEach(module('bshmApp.icon'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<icon></icon>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the icon directive');
  }));
});
