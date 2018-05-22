/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// import models
import User from '../api/user/user.model';
import Folder from '../api/folder/folder.model';
import Warning from '../api/warning/warning.model';

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

    Warning.find({}).remove()
      .then(() => {
        Warning.create({
          channel: 'FCXF-X-02-A01',
          startTime: new Date(2018, 4, 22, 10, 5, 20),
          endTime: new Date(2018, 4, 22, 10, 7, 20),
          level: 1,
          principal: 'Arthur',
          status: 0
        }, {
          channel: 'FCXF-X-02-A02',
          startTime: new Date(2018, 4, 22, 10, 5, 20),
          endTime: new Date(2018, 4, 22, 10, 7, 20),
          level: 0,
          principal: 'Arthur',
          status: 1
        })
        .then(() => console.log('finished populating warnings'))
        .catch(err => console.log('error populating warnings', err));
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
