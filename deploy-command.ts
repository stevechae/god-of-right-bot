const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('fbike').setDescription('fuck bikes'),
    new SlashCommandBuilder().setName('sjy').setDescription('Yoon So Ryong'),
    new SlashCommandBuilder().setName('amc').setDescription('How\'s AMC doing today?'),
    new SlashCommandBuilder().setName('gme').setDescription('How\'s GME doing today?'),
    new SlashCommandBuilder().setName('btc').setDescription('How\'s Bitgoin doing today?')
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);