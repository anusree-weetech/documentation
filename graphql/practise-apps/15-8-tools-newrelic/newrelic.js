'use strict';

require('dotenv').config();

exports.config = {
  app_name: ['minimal-graphql-app'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info'
  }
};
