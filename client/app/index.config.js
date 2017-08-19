'use strict';

export default function($translateProvider) {
  'ngInject';
  // put your common app configurations here

  // angular-translate configuration
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '{part}/i18n/{lang}.json'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('sanitize');
}
