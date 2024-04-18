const handler = (message) => {
  message.channel.send(`Fetch and show goa Weather`);
};

module.exports = {
  name: 'goa',
  description: 'still have to work on this Some Goa tropical vibes 🏖️📀',
  execute: handler,
};
