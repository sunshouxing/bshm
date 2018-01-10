module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'bshm',
      script: 'dist/server/index.js',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
