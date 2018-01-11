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
        IP: "192.168.1.106",
        PORT: 8080,
        // UPLOAD_DIR: '/webapp/dist/client/assets/uploads/',
        // MONGODB_URI: 'mongodb://mongodb:27017/bshm'
      }
    }
  ]
};
