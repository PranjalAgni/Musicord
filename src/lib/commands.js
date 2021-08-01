const handleCommands = (message) => {
  if (message.content === '!hi') {
    message.reply('Hello there 👋');
  }
};

module.exports = handleCommands;
