'use strict';

export default function(msNavigationServiceProvider) {
  'ngInject';

  // register apps navigation group
  msNavigationServiceProvider.saveItem('apps', {
    title: 'APPS',
    group: true,
    weight: 1
  });
}

/* vim:set sw=2 ts=2 sts=2: */
