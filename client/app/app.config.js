'use strict';

export default function($translateProvider, $mdIconProvider) {
  'ngInject';
  // put your common app configurations here

  // register icons from outsides
  $mdIconProvider
    .icon('icon-navigate-first', 'assets/icons/navigate-first.svg', 24)
    .icon('icon-navigate-last', 'assets/icons/navigate-last.svg', 24)
    .icon('icon-navigate-next', 'assets/icons/navigate-next.svg', 24)
    .icon('icon-navigate-previous', 'assets/icons/navigate-previous.svg', 24);

  // angular-translate configuration
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '{part}/i18n/{lang}.json'
  });
  // tell the module what language to use by default
  $translateProvider.preferredLanguage('zh');
  // tell the module to store the language in the cookies
  $translateProvider.useCookieStorage();

  $translateProvider.useSanitizeValueStrategy('sce');
}
