/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// import models
import User from '../api/user/user.model';
import Folder from '../api/folder/folder.model';

import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if (config.seedDB) {
    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });

    // mail folders sample data
    Folder.find({}).remove()
      .then(() => {
        Folder.create(
          {
            name: 'inbox',
            title: 'Inbox',
            icon: 'icon-inbox'
          },
          {
            name: 'sent',
            title: 'Sent',
            icon: 'icon-send'
          },
          {
            name: 'drafts',
            title: 'Drafts',
            icon: 'icon-email-open'
          },
          {
            name: 'spam',
            title: 'Spam',
            icon: 'icon-alert-octagon'
          },
          {
            name: 'trash',
            title: 'Trash',
            icon: 'icon-delete'
          },
          {
            name: 'starred',
            title: 'Starred',
            icon: 'icon-star'
          },
          {
            name: 'important',
            title: 'Important',
            icon: 'icon-label'
          }
        )
        .then(() => console.log('finished populating mail folders'))
        .catch(error => console.log(`error when populating mail folders, error info: ${error}`));
      });
  }
}
