const handler = (message) => {
  message.channel.send(`Weather in Goa is 29 degrees`);
};

module.exports = {
  name: 'goa',
  description: 'Some Goa tropical vibes 🏖️📀',
  execute: handler,
};
