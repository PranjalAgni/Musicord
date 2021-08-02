require('dotenv').config();

module.exports = {
  botToken: process.env.DISCORD_BOT_TOKEN,
  githubToken: process.env.GH_OAUTH_TOKEN,
  prefix: '!',
};
