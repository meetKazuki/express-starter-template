require('dotenv').config();

const {
  DEV_DB_URL,
  TEST_DB_URL,
  STAGING_DB_URL,
  PRODUCTION_DB_URL,
} = process.env;

const env = process.NODE_ENV || 'development';
const dbURLs = {
  development: DEV_DB_URL,
  test: TEST_DB_URL,
  staging: STAGING_DB_URL,
  production: PRODUCTION_DB_URL,
};

const url = dbURLs[env];

const dbConfig = {
  logging: false,
  dialect: 'postgres',
};

module.exports = {
  url,
  dbConfig,
};
