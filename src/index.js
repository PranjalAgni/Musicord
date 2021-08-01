require('dotenv').config();
const discordClient = require('./lib/client');
const discordListeners = require('./lib/listeners');

const main = () => {
  discordClient.on('ready', discordListeners.onReadyHandler);
  discordClient.on('message', discordListeners.onMessageHandler);
  discordClient.login(process.env.DISCORD_BOT_TOKEN);
};

main();
