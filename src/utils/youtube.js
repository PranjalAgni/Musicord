const ytdl = require('ytdl-core');
const { secondsToMinutes } = require('./time');

const fetchYTData = async (ytUrl) => {
  let ytData = {
    found: false,
    title: null,
    url: null,
  };
  const musicInfo = await ytdl.getInfo(ytUrl);
  if (!musicInfo) return ytData;

  const { title, video_url: url, lengthSeconds } = musicInfo.videoDetails;
  ytData = Object.assign(ytData, {
    found: true,
    title,
    url,
    lengthMinutes: secondsToMinutes(lengthSeconds),
  });

  return ytData;
};

const fetchMusicStream = (musicUrl) => ytdl(musicUrl);

module.exports = {
  fetchYTData,
  fetchMusicStream,
};
