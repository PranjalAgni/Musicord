const config = require('../config');
const handleCommands = require('./commands');

const onReadyHandler = () => {
  console.log('Discord bot ready');
};

const onMessageHandler = (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  handleCommands(message);
};

module.exports = {
  onReadyHandler,
  onMessageHandler,
};
