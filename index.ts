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

const kimsungmoImgs = [
    'http://file.instiz.net/data/file/20130128/2/d/0/2d02e1c31c1c36aa77e08b7778625ca1',
    'http://file.instiz.net/data/file/20130128/2/2/7/227945e23baa2dcf8324f03acd26c885',
    'http://file.instiz.net/data/file/20130128/c/0/c/c0c137c50f7fb8bed301959f60daee73',
    'http://file.instiz.net/data/file/20130128/2/2/b/22b174240919b207ed3d22ee634e76a7',
    'http://file.instiz.net/data/file/20130128/3/e/4/3e4b06f7ec7779f6962deea644867cc8',
    'http://file.instiz.net/data/file/20130128/d/c/8/dc83393cc8c0695ac12e8b14d473ffa9',
    'http://file.instiz.net/data/file/20130128/a/9/7/a976e19468e4e683b652e2359a39c89e',
    'http://file.instiz.net/data/file/20130128/e/6/a/e6a1d469ebe72e93d4089d9da920a2eb',
    'http://file.instiz.net/data/file/20130128/9/e/0/9e0669d85d188a293de6fff84d370885',
    'http://file.instiz.net/data/file/20130128/9/b/5/9b597d8bca57ec4962421af22285dbda',
    'http://file2.instiz.net/data/file/20141011/8/1/a/81a7150d99f410530aa78cc71c4b8a33.jpg',
    'http://file2.instiz.net/data/file/20141011/a/d/b/adb1ac125d70c535e57c6f05de0f91e5.jpg',
    'http://file.instiz.net/data/file/20130128/1/e/e/1eeb1e1c36eacf684f808a1eaf8b9dc1',
    'http://file.instiz.net/data/file/20130128/f/8/b/f8b81bb29b9c4d9902e003c754c3e807',
    'http://file.instiz.net/data/file/20130128/8/9/0/890a8970791232a3dfbdac8eefa52324',
    'http://file.instiz.net/data/file/20130128/1/e/e/1ee526c200e8f545baec77907342e89e',
    'http://file.instiz.net/data/file/20140712/7/e/0/7e0e0619e223c58c2a340d1982bd76ec.jpg'
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
        case 'ksm':
            await interaction.reply(kimsungmoImgs[Math.floor(Math.random() * kimsungmoImgs.length)]);
            break;
        default:
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);
