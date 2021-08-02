const got = require('got');
const config = require('../config');

const gotClient = got.extend({
  headers: {
    Authorization: `token ${config.githubToken}`,
  },
});

module.exports = gotClient;
