'use strict';

describe('Directive: ngEcharts', function() {
  // load the directive's module
  beforeEach(module('bshm.directives.ng-echarts'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<ng-echarts></ng-echarts>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngEcharts directive');
  }));
});
