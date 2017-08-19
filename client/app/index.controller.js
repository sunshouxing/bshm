'use strict';

export function IndexController(fuseTheming) {
  'ngInject';

  // Data
  this.themes = fuseTheming.themes;
}

export function MainController($scope, $rootScope) {
  'ngInject';

  // remove the splash screen
  $scope.$on('$viewContentAnimationEnded', event => {
    if(event.targetScope.$id === $scope.$id) {
      $rootScope.$broadcast('msSplashScreen::remove');
    }
  });
}
