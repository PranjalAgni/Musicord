const config = require('../config');
const discordClient = require('./client');

const onReadyHandler = () => {
  console.log('Discord bot ready');
};

const onMessageHandler = async (message) => {
  try {
    if (!message.content.startsWith(config.prefix) || message.author.bot) {
      return;
    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!discordClient.commands.has(command)) return;
    await discordClient.commands.get(command).execute(message, args);
  } catch (ex) {
    console.error(ex.stack);
    message.reply('there was an error trying to execute that command!');
  }
};

module.exports = {
  onReadyHandler,
  onMessageHandler,
};
