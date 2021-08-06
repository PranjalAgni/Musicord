const validUrl = require('valid-url');
const musicalQueue = require('../utils/queue');
const { fetchYTData, fetchMusicStream } = require('../utils/youtube');

const constructQueueObject = (textChannel, voiceChannel) => ({
  currentPlaying: false,
  textChannel,
  voiceChannel,
  connections: null,
  songs: [],
  volume: 5,
});

const startBeats = (guildId, updateCurrentPlayingSong) => {
  const guildsMusicManager = musicalQueue.get(guildId);
  const currentSong = guildsMusicManager.songs[0];
  if (!currentSong) {
    guildsMusicManager.voiceChannel.leave();
    musicalQueue.delete(guildId);
    return;
  }

  guildsMusicManager.currentPlaying = true;
  updateCurrentPlayingSong(currentSong);
  const dispatcher = guildsMusicManager.connection
    .play(fetchMusicStream(currentSong.url))
    .on('finish', () => {
      guildsMusicManager.songs.shift();
      startBeats(guildId, updateCurrentPlayingSong);
    })
    .on('error', (err) => {
      guildsMusicManager.currentPlaying = false;
      guildsMusicManager.textChannel.send(
        `Some error occured while playing song ${err.message}`
      );
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

  message.channel.send(`🌈 **Searching** 🌈: \`${args[0]}\``);
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
  // connects to voice channel
  const connection = await voiceChannel.join();
  guildsMusicManager.connection = connection;

  if (guildsMusicManager.currentPlaying) {
    return message.channel.send(
      `💚 Added to queue: ${musicInfo.title}\n **Queue number**: ${guildsMusicManager.songs.length}`
    );
  }

  const updateCurrentPlayingSong = (currentSong) => {
    message.channel.send(
      `⚡ **Current Playing**: ${currentSong.title} - ${currentSong.lengthSeconds}`
    );
  };

  return startBeats(message.guild.id, updateCurrentPlayingSong);
};

module.exports = {
  name: 'beats',
  description: 'Plays the music based on the YT url',
  execute: handler,
};
