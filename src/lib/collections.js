const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');

const collections = new Discord.Collection();

const commandsDir = path.join(__dirname, '../', 'commands');
const commandFiles = fs
  .readdirSync(commandsDir)
  .filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const commandFile = path.join(commandsDir, file);
  const command = require(commandFile);
  collections.set(command.name, command);
});

module.exports = collections;
