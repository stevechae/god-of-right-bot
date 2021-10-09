import { Client, Intents } from 'discord.js';
import axios from 'axios';
import { getRandomTronaldQuote } from './tronald_quotes';

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

const kimsungmoImgs = [
    'https://www.newiki.net/w/images/thumb/5/53/More_details_be_omitted.jpg/471px-More_details_be_omitted.jpg',
    'http://file.instiz.net/data/file/20130128/c/0/c/c0c137c50f7fb8bed301959f60daee73',
    'https://mblogthumb-phinf.pstatic.net/20160325_81/crebugs_m_1458889576018EYs4s_JPEG/%B1%E8%C8%AD%B9%E93.jpg?type=w2',
    'https://mblogthumb-phinf.pstatic.net/20160325_145/crebugs_m_1458889576443xQacS_JPEG/%B1%E8%C8%AD%B9%E95.jpg?type=w2',
    'https://mblogthumb-phinf.pstatic.net/20160325_87/crebugs_m_1458889577268Hd15k_JPEG/%B1%E8%C8%AD%B9%E98.jpg?type=w2',
    'https://mblogthumb-phinf.pstatic.net/20160325_240/crebugs_m_1458889577414ORwIB_JPEG/%B1%E8%C8%AD%B9%E99.jpg?type=w2',
    'https://cdn.ppomppu.co.kr/zboard/data3/2017/0529/m_20170529232217_icmchepi.jpg',
    'https://cdn.discordapp.com/attachments/253942519761600512/896288425475444747/16298098223392.png',
    'https://www.ibric.org/upload/geditor/202009/0.01173000_1601395333.jpg',
    'https://i1.ruliweb.com/img/21/01/18/177147253fb5381d2.jpg'
];

const iexUrl = process.env.IEX_API_URL;

const stockStuffRenderer = async (symbol: string) => {
    try {
        const data: any = (await axios.get(`https://${iexUrl}/stable/stock/${symbol}/quote`, {
            params: {
                token: process.env.IEX_API_TOKEN
            }
        })).data;
        const changePerc = ((data.changePercent < 0) ? '-' : '+') + Math.abs(data.changePercent * 100).toFixed(2);
        let replyMsg = `${data.companyName} (${data.symbol}): ${data.currency} \$${data.iexRealtimePrice} (**${changePerc}%**)`;
        if (data.changePercent > 0) {
            replyMsg += ' :rocket: :rocket: :rocket: https://tenor.com/view/hoge-hoge-finance-rise-arrow-gif-21389148';
        } else {
            replyMsg += ' :cry: :cry: :cry: https://tenor.com/view/rage-red-stocks-crash-stocks-crashing-downwards-gif-17056650';
        }

        return replyMsg;
    } catch (error) {
        console.error(error);
        return "Error. Couldn't get it.";
    }
}
const weatherRenderer = async () => {
    try {
        const data: any = (await axios.get(`api.openweathermap.org/data/2.5/weather?q=toronto,ca&units=metric&appId=4b7ade0750ecf707bcd15c282cf8c621`)).data;
        return "temp : " + data.main.temp + ", feels like : " + data.main.feels_like + ", humidity : " + data.main.humidity;
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
        case 'weather':
            await  interaction.reply(weatherRenderer());
            break;
        case 'emperor':
            const tronaldQuoteRaw: any = await getRandomTronaldQuote();
            const formattedQuote = `"${tronaldQuoteRaw.value}" - God Emperor of Mankind`;
            await interaction.reply(formattedQuote);
            break;
        default:
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);
