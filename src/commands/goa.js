const handler = (message) => {
  message.channel.send(`Fetch and show goa Weather`);
};

module.exports = {
  name: 'goa',
  description: 'Some Goa tropical vibes 🏖️📀',
  execute: handler,
};
