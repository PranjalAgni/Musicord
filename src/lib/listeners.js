const config = require('../config');
const discordClient = require('./client');

const onReadyHandler = () => {
  console.log('Discord bot ready');
};

const onMessageHandler = (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (!discordClient.commands.has(message.content)) return;

  discordClient.commands.get(message.content).execute(message);
};

module.exports = {
  onReadyHandler,
  onMessageHandler,
};
