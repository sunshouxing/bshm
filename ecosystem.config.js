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
        NODE_ENV: 'production',
        PORT: 8000,
        MONGODB_URI: 'mongodb://mongodb:27017/bshm'
      }
    }
  ]
};
