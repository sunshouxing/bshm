'use strict';

export default function($rootScope, $timeout, $state) {
  'ngInject';

  // activate loading indicator
  const stateChangeStartEvent = $rootScope.$on('$stateChangeStart', () => {
    $rootScope.loadingProgress = true;
  });

  // de-activate loading indicator
  const stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', () => {
    $timeout(() => {
      $rootScope.loadingProgress = false;
    });
  });

  // store state in the root scope for easy access
  $rootScope.state = $state;

  // cleanup
  $rootScope.$on('$destroy', () => {
    stateChangeStartEvent();
    stateChangeSuccessEvent();
  });
}
