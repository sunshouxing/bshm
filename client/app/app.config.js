'use strict';

export default function($translateProvider) {
  'ngInject';
  // put your common app configurations here

  // angular-translate configuration
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '{part}/i18n/{lang}.json'
  });
  // tell the module what language to use by default
  $translateProvider.preferredLanguage('en');
  // tell the module to store the language in the cookies
  $translateProvider.useCookieStorage();

  $translateProvider.useSanitizeValueStrategy('sanitize');
}
