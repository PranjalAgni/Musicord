const config = require('../config');

const loginToDiscord = (discordClient) => {
  try {
    discordClient.login(config.botToken);
  } catch (ex) {
    console.error('Error occured while logging in', ex.stack);
  }
};

module.exports = {
  loginToDiscord,
};
