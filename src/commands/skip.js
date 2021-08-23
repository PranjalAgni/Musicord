const musicalQueue = require('../utils/queue');

const handler = async (message) => {
  try {
    const guildId = message.guild.id;
    const guildsMusicManager = musicalQueue.get(guildId);
    if (guildsMusicManager) {
      guildsMusicManager.connection.dispatcher.end();
    }
  } catch (ex) {
    console.error('Exception occured on !skip ', ex);
  }

  return message.channel.send('☕ 💖 Skipped current playing song');
};

module.exports = {
  name: 'skip',
  description: 'Skips the current playing song',
  execute: handler,
};
