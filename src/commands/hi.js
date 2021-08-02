const handler = (message) => {
  message.channel.send('Hello there 👋');
};

module.exports = {
  name: 'hi',
  description: 'Says Hi',
  execute: handler,
};
