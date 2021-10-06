import { Client, Intents } from 'discord.js';

const client = new Client({intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Ready!');
});

const bikeFailGifs = [
    'https://tenor.com/view/bike-fail-bike-fall-gif-16484215',
    'https://tenor.com/view/mountain-bike-fail-failure-water-wet-gif-16027487',
    'https://tenor.com/view/crash-flip-leading-fell-fall-gif-5262194',
    'https://tenor.com/view/bike-crash-bicycle-gif-8120035',
    'https://tenor.com/view/drunk-bike-rider-fail-gif-5973076',
    'https://tenor.com/view/bicycle-bike-biking-crash-fail-gif-3464235',
    'https://tenor.com/view/waynes-world-bicycle-crash-gif-19796976',
    'https://tenor.com/view/crashing-jonas-brothers-olympic-dreams-featuring-jonas-brothers-bike-crash-clash-gif-22561162'
];

const yoonSoRyongGifs = [
    'https://tenor.com/view/bruce-lee-flex-%E6%9D%8E%E5%B0%8F%E9%BE%99-gif-8528490',
    'https://tenor.com/view/bruce-lee-karate-slow-motion-fight-me-lets-fight-gif-16092390',
    'https://tenor.com/view/stare-blood-bruce-lee-lick-gif-15754424',
]

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch(commandName) {
        case 'fbike':
            await interaction.reply(bikeFailGifs[Math.floor(Math.random() * bikeFailGifs.length)]);
            break;
        case 'sjy':
            await interaction.reply(yoonSoRyongGifs[Math.floor(Math.random() * yoonSoRyongGifs.length)])
            break;
        default:
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);