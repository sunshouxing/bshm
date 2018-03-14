/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/realtime-data', require('./api/realtime-data'));
  app.use('/api/processors', require('./api/processor'));
  app.use('/api/channels', require('./api/channel'));
  app.use('/api/sensors', require('./api/sensor'));
  app.use('/api/sections', require('./api/section'));
  app.use('/api/bridges', require('./api/bridge'));
  app.use('/api/files', require('./api/file'));
  app.use('/api/mail/folders', require('./api/folder'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
