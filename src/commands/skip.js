const musicalQueue = require('../utils/queue');

const handler = async (message) => {
  const guildId = message.guild.id;
  const guildsMusicManager = musicalQueue.get(guildId);
  if (guildsMusicManager) {
    guildsMusicManager.connection.dispatcher.end();
  }

  return message.channel.send('☕ 💖 Skipped current playing song');
};

module.exports = {
  name: 'skip',
  description: 'Skips the current playing song',
  execute: handler,
};
