const Discord = require('discord.js');
const discordCollection = require('./collections');

const client = new Discord.Client();

client.commands = discordCollection;

module.exports = client;
