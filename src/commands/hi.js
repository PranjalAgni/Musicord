const handler = (message) => {
  if (message.content === '!hi') {
    message.channel.send('Hello there 👋');
  }
};

module.exports = {
  name: 'hi',
  description: 'Says Hi',
  execute: handler,
};
