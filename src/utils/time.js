const secondsToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  return minutes;
};

module.exports = {
  secondsToMinutes,
};
