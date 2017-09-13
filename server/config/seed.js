/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// import models
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Folder from '../api/folder/folder.model';

import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Thing.find({}).remove()
      .then(() => {
        let thing = Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your index.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators'
        });
        return thing;
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));

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
        .then(() => console.log('finished to populating mail folders'))
        .catch(error => console.log(`error when populating mail folders, error info: ${error}`));
      });
  }
}
