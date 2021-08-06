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
  description:
    'Stops the current playing the song, clears the queue and removes the voice channel',
  execute: handler,
};
