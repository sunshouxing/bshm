'use strict';

import angular from 'angular';

export default function($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/sample');

  /**
   * Layout Style Switcher
   *
   * This code is here for demonstration purposes.
   * If you don't need to switch between the layout
   * styles like in the demo, you can set one manually by
   * typing the template urls into the `State definitions`
   * area and remove this code
   */
  // Inject $cookies
  let $cookies;

  angular.injector(['ngCookies']).invoke([
    '$cookies', _$cookies => {
      $cookies = _$cookies;
    }
  ]);

  // Get active layout
  let layoutStyle = $cookies.get('layoutStyle') || 'verticalNavigation';

  const layouts = {
    verticalNavigation: {
      main: 'app/fuse/core/layouts/vertical-navigation.html',
      toolbar: 'app/fuse/toolbar/layouts/vertical-navigation/toolbar.html',
      navigation: 'app/fuse/navigation/layouts/vertical-navigation/navigation.html'
    },
    verticalNavigationFullwidthToolbar: {
      main: 'app/fuse/core/layouts/vertical-navigation-fullwidth-toolbar.html',
      toolbar: 'app/fuse/toolbar/layouts/vertical-navigation-fullwidth-toolbar/toolbar.html',
      navigation: 'app/fuse/navigation/layouts/vertical-navigation/navigation.html'
    },
    verticalNavigationFullwidthToolbar2: {
      main: 'app/fuse/core/layouts/vertical-navigation-fullwidth-toolbar-2.html',
      toolbar: 'app/fuse/toolbar/layouts/vertical-navigation-fullwidth-toolbar-2/toolbar.html',
      navigation: 'app/fuse/navigation/layouts/vertical-navigation-fullwidth-toolbar-2/navigation.html'
    },
    horizontalNavigation: {
      main: 'app/fuse/core/layouts/horizontal-navigation.html',
      toolbar: 'app/fuse/toolbar/layouts/horizontal-navigation/toolbar.html',
      navigation: 'app/fuse/navigation/layouts/horizontal-navigation/navigation.html'
    },
    contentOnly: {
      main: 'app/fuse/core/layouts/content-only.html',
      toolbar: '',
      navigation: ''
    },
    contentWithToolbar: {
      main: 'app/fuse/core/layouts/content-with-toolbar.html',
      toolbar: 'app/fuse/toolbar/layouts/content-with-toolbar/toolbar.html',
      navigation: ''
    }
  };
  // END - Layout Style Switcher

  // State definitions
  $stateProvider
  .state('app', {
    abstract: true,
    views: {
      'main@': {
        templateUrl: layouts[layoutStyle].main,
        controller: 'MainController as vm'
      },
      'toolbar@app': {
        templateUrl: layouts[layoutStyle].toolbar,
        controller: 'ToolbarController as vm'
      },
      'navigation@app': {
        templateUrl: layouts[layoutStyle].navigation,
        controller: 'NavigationController as vm'
      },
      'quickPanel@app': {
        templateUrl: 'app/fuse/quick-panel/quick-panel.html',
        controller: 'QuickPanelController as vm'
      }
    }
  });
}
