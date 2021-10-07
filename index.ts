import { Client, Intents } from 'discord.js';
import axios from 'axios';

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

const iexUrl = process.env.IEX_API_URL;

const stockStuffRenderer = async (symbol: string) => {
    try {
        const data: any = (await axios.get(`https://${iexUrl}/stable/stock/${symbol}/quote`, {
            params: {
                token: process.env.IEX_API_TOKEN
            }
        })).data;
        let replyMsg = `${data.companyName} (${data.symbol}): ${data.currency} \$${data.delayedPrice} (**${(data.changePercent * 100).toFixed(2)}%**)`;
        if (data.changePercent > 0) {
            replyMsg += ' TO THE MOON :rocket: :rocket: :rocket:';
        } else {
            replyMsg += ' FUUUCK :cry: :cry: :cry:';
        }

        return replyMsg;
    } catch (error) {
        console.error(error);
        return "Error. Couldn't get it.";
    }
}

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
        case 'amc':
            await interaction.reply(await stockStuffRenderer(commandName));
            break;
        case 'gme':
            await interaction.reply(await stockStuffRenderer(commandName));
            break;
        case 'btc':
            const data: any = (await axios.get(`https://${iexUrl}/stable/crypto/btcusd/price`, {
                params: {
                    token: process.env.IEX_API_TOKEN
                }
            })).data;
            await interaction.reply(`Bitgoin USD: $${data.price}`);
            break;
        default:
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);