'use strict';

export default function config($translatePartialLoaderProvider, msApiProvider) {
  'ngInject';

  // translation
  $translatePartialLoaderProvider.addPart('app/main/structure/bridge');

  // api
  msApiProvider.register('mail.labels', ['app/data/mail/labels.json']);

  msApiProvider.register('mail.label.notes', ['app/data/mail/labels/notes.json']);
  msApiProvider.register('mail.label.paypal', ['app/data/mail/labels/paypal.json']);
  msApiProvider.register('mail.label.invoices', ['app/data/mail/labels/invoices.json']);
  msApiProvider.register('mail.label.amazon', ['app/data/mail/labels/amazon.json']);

  msApiProvider.register('mail.folder.sent', ['app/data/mail/folders/sent.json']);
  msApiProvider.register('mail.folder.drafts', ['app/data/mail/folders/drafts.json']);
  msApiProvider.register('mail.folder.spam', ['app/data/mail/folders/spam.json']);
  msApiProvider.register('mail.folder.trash', ['app/data/mail/folders/trash.json']);
  msApiProvider.register('mail.folder.starred', ['app/data/mail/folders/starred.json']);
  msApiProvider.register('mail.folder.important', ['app/data/mail/folders/important.json']);
}

/* vim:set sw=2 ts=2 sts=2: */
