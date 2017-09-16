'use strict';

export default function($scope, $rootScope) {
  'ngInject';

  // remove the splash screen
  $scope.$on('$viewContentAnimationEnded', event => {
    if (event.targetScope.$id === $scope.$id) {
      $rootScope.$broadcast('msSplashScreen::remove');
    }
  });
}

/* vim:set sw=2 ts=2 sts=2: */
