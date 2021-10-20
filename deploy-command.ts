   
import {SlashCommandStringOption} from "@discordjs/builders/dist/interactions/slashCommands/options/string";

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('fbike').setDescription('fuck bikes'),
    new SlashCommandBuilder().setName('btc').setDescription('How\'s Bitgoin doing today?'),
    new SlashCommandBuilder().setName('ksm').setDescription('Do you know Kim Sungmo?'),
    new SlashCommandBuilder().setName('emperor').setDescription('Inspiring quotes from the Emperor'),
    new SlashCommandBuilder().setName('weather').setDescription('How\'s weather now?')
        .addStringOption((option: SlashCommandStringOption) => option.setName('postal').setDescription('First 3 chars of postal code').setRequired(true)),
    new SlashCommandBuilder().setName('stock').setDescription('Any stock quote')
        .addStringOption((option: SlashCommandStringOption) => option.setName('symbol').setDescription('Stock symbol').setRequired(true)),
    new SlashCommandBuilder().setName('food').setDescription('What do I eat?')
        .addStringOption((option: SlashCommandStringOption) => option.setName('postal').setDescription('Your postal code').setRequired(true)),
    new SlashCommandBuilder().setName('quiz').setDescription('Riddle me this.')
        .addStringOption(
            (option: SlashCommandStringOption) => option.setName('category')
            .setDescription('Linux, DevOps, Docker, or BASH')
            .setRequired(true)
            .addChoice('Linux', 'Linux')
            .addChoice('DevOps', 'DevOps')
            .addChoice('Docker', 'Docker')
            .addChoice('BASH', 'BASH')),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);