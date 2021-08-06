const musicalQueue = require('../utils/queue');

const handler = async (message) => {
  const guildId = message.guild.id;
  const guildsMusicManager = musicalQueue.get(guildId);
  if (guildsMusicManager) {
    guildsMusicManager.voiceChannel.leave();
    musicalQueue.delete(guildId);
  }

  return message.channel.send('☺️ Refreshed queue for the guild');
};

module.exports = {
  name: 'refresh',
  description: 'Removes all the songs from queue, for the guild',
  execute: handler,
};
