require('dotenv').config();

const config = {
  app: {
    port: parseInt(process.env.PORT) || 5000
  },
  db: {
    dbConnectionString: process.env.DB_CONNECTION_STRING,
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 27017,
    name: process.env.DEV_DB_NAME || 'db'
  },
  cloudinary: {
    cloud_name: 'writerrate',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  }
};

module.exports = config;