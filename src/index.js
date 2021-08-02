const discordClient = require('./lib/client');
const discordListeners = require('./lib/listeners');
const { loginToDiscord } = require('./lib/auth');

const main = async () => {
  discordClient.on('ready', discordListeners.onReadyHandler);
  discordClient.on('message', discordListeners.onMessageHandler);
  loginToDiscord(discordClient);
};

main();
