const onReadyHandler = () => {
  console.log('Discord bot ready');
};

const onMessageHandler = (msg) => {
  if (msg.content === 'hello') {
    msg.reply('Hello there 👋');
  }
};

module.exports = {
  onReadyHandler,
  onMessageHandler,
};
