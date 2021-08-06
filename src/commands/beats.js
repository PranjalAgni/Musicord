const validUrl = require('valid-url');
const musicalQueue = require('../utils/queue');
const { fetchYTData, fetchMusicStream } = require('../utils/youtube');

const constructQueueObject = (textChannel, voiceChannel) => ({
  textChannel,
  voiceChannel,
  connections: null,
  songs: [],
  volume: 5,
  playing: true,
});

const startBeats = (guildId, currentSong) => {
  const guildsMusicManager = musicalQueue.get(guildId);
  if (!currentSong) {
    guildsMusicManager.voiceChannel.leave();
    musicalQueue.delete(guildId);
    return;
  }

  const dispatcher = guildsMusicManager.connection
    .play(fetchMusicStream(currentSong.url))
    .on('finish', () => {
      guildsMusicManager.songs.shift();
      startBeats(guildId, guildsMusicManager.songs[0]);
    })
    .on('error', (err) => {
      console.trace(err);
    });

  dispatcher.setVolumeLogarithmic(guildsMusicManager.volume / 5);
  guildsMusicManager.textChannel.send(`🎵 **Playing** 🎵 ${currentSong.title}`);
};
const handler = async (message, args) => {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.channel.send(
      '⚔️ You need to be in a voice channel to use this command'
    );
  }

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send('🔒 I dont have proper permissions');
  }

  if (!validUrl.isUri(args[0])) {
    return message.channel.send(`${args[0]} is not a valid url`);
  }

  message.channel.send(`🌈 **Searching** 🌈: ${args[0]}`);
  const musicInfo = await fetchYTData(args[0]);
  if (!musicInfo.found) {
    return message.channel.send(`✂️ Cannot found any data for ${args[0]}`);
  }

  let guildsMusicManager = musicalQueue.get(message.guild.id);

  if (!guildsMusicManager) {
    const musicObj = constructQueueObject(message.channel, voiceChannel);
    musicalQueue.set(message.guild.id, musicObj);
    guildsMusicManager = musicObj;
  }

  guildsMusicManager.songs.push(musicInfo);

  message.channel.send(`⚡ Added to queue: ${musicInfo.title}`);

  // connects to voice channel
  const connection = await voiceChannel.join();
  guildsMusicManager.connection = connection;
  return startBeats(message.guild.id, guildsMusicManager.songs[0]);
};

module.exports = {
  name: 'beats',
  description: 'Plays the music based on the YT url',
  execute: handler,
};
