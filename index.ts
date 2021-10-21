import { Client, Intents } from 'discord.js';
import axios from 'axios';
import { Client as GMapClient } from '@googlemaps/google-maps-services-js';
import { getRandomTronaldQuote } from './tronald_quotes';
import { createQuizEmbed } from './quiz-embed';
import { MessageAttachment } from 'discord.js';

const client = new Client({intents: [Intents.FLAGS.GUILDS] });

const gmapClient = new GMapClient({});

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
    'https://i1.ruliweb.com/img/21/01/18/177147253fb5381d2.jpg',
    'https://image5jvqbd.fmkorea.com/files/attach/new/20170501/33854530/7547092/641689329/98496eb46a3ad5026894a910f005b752.jpg',
    'https://image5jvqbd.fmkorea.com/files/attach/new/20170501/33854530/7547092/641689329/389af809b37275b279fb436f56917d23.jpeg',
    'https://image.fmkorea.com/files/attach/new/20180825/486616/1203205963/1232055079/6a1ae8584c9168f044b9200e28054f75.jpg',
    'https://jjalbot.com/media/2018/12/Hkvxp8xQa/zzal.jpg',
    'https://storage.googleapis.com/jjalbot-jjals/2016/10/SkW-TwpL0/20150402_551d41733b66b.jpg',
    'https://storage.googleapis.com/jjalbot-jjals/2016/10/BJb03Up80/20160818_57b53434bcc22.jpg',
    'https://storage.googleapis.com/jjalbot-jjals/2016/10/BklWFUaL0/20160825_57be513944813.jpg',
    'https://storage.googleapis.com/jjalbot-jjals/2016/10/r1eNtLpUC/20160825_57be47332c55b.jpg',
    'https://obj-sg.thewiki.kr/data/6174746163686d656e742f61303038303833345f353035663235643532323236322e6a7067.jpg',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20120528_268%2Fbmh_1990_1338191307146GW0PK_PNG%2Fvn.png&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20120530_124%2Fbmh_1990_1338361826652EbJfE_PNG%2F%25BE%25C6%25B7%25C3%25C7%25D1_%25B1%25E2%25BE%25EF__%25B7%25B0%25C5%25B0%25C2%25AF_%25B8%25EE_%25C0%25E5%25B8%25E9%25B5%25E9%25C0%25BB_%25B5%25C7%25BB%25F5%25B0%25DC%25BA%25B8%25B4%25D9...____%25B3%25D7%25C0%25CC%25B9%25F6%25BA%25ED%25B7%25CE%25B1%25D7.png&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20120528_193%2Fbmh_1990_1338190544263AbDg0_PNG%2F%25C0%25FC%25B4%25EB%25B8%25F0_%25B4%25EB%25C7%25D0%25BB%25FD_%25B7%25B9%25C6%25F7%25C6%25AE_%25C5%25E4%25C0%25CD_%25C1%25B7%25BA%25B8_%25BD%25BA%25C6%25E5_%25B0%25F8%25B8%25F0%25C0%25FC_%25C0%25DA%25B0%25DD%25C1%25F5_%25C6%25ED%25C0%25D4%25C7%25D0_____%25B3%25D7%25C0%25CC%25B9%25F6_%25C4%25AB%25C6%25E4.png&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20120528_282%2Fbmh_1990_1338190544421KD0Ah_PNG%2Fbb.png&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20150801_36%2Ffujisakinade_1438421005674TSMI1_PNG%2FScreenshot_2015-08-01-12-29-18-1.png&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxNzEyMTJfMjk5%2FMDAxNTEzMDg5NjUxNjM0.DKQ8-dI5ndi3oeLLAnSk9LnI3K9RUyE6CVRNb5NS4kog._jrOv1FPT7xU_3I_YNC9xdmaXfP9mF4Q-0PnOI2bWFkg.JPEG.kyk990314%2FexternalFile.jpg&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEwMTFfMjQ1%2FMDAxNTcwNzk1OTY5MjU2.EX-WjrlPRqCSq8eYchYou1-5WiqGPyqhdUa2JUpJfMMg.i3QwdvWKuwXkoPkLqCw153aEor30A12vw1lEbtDApFUg.JPEG.3llll%2F1570592552.jpg&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20140827_163%2Fskdksgo234_1409076028052KkdtQ_JPEG%2FNa1409076015383.jpg&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20120609_151%2Fvanpelt_1339172163783WXj9V_JPEG%2F111.jpg&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA4MDlfMTU3%2FMDAxNTY1MzE2NTY3NDk3.i2bYrSEuE63-i10Cekta4OsruTe2BDZjo33I93v6RsMg.XGj5FfsLJeQO5gZ1goY41yUrGaFpDxHvb-_3gLFjdO8g.GIF.0526hansu%2FNaverBlog_20190809_110926_00.gif&type=sc960_832_gif',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20090918_70%2Fwoodall1_1253258004119XHLos_jpg%2F%25B4%25EB%25B7%25AB_%25C1%25A4%25BD%25C5%25C0%25CC_%25B8%25DB_woodall1.jpg&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160330_194%2Fqpfpzk9876_145931218389736zR4_JPEG%2F2016-03-30-13-24-46.jpg&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150824_136%2Fcn54516_1440346214542sHS0S_PNG%2F__3.png&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20120628_168%2Fchris84bloom_1340848202725xeUSF_JPEG%2F0_00010.jpg&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxNjEwMTlfMjQz%2FMDAxNDc2ODc2NTQ3NTEx.RTNyDgJoohVpj8Op39Ev1Prr4rb3XJ07e07QLX5uXLMg.KBKLz4T0QNbxuCcBjntv_2WPz1dCxRo9pxiotmVjLAMg.JPEG.kyle0196%2FKakaoTalk_20151008_021918723.jpg&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20100417_124%2Flunaticage_1271437169493hnDXc_jpg%2F2131_lunaticage.jpg&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA3MDVfNzgg%2FMDAxNjI1NDQ2ODE5NzEy.RkAZL4XJys2mpxGl8JiNE-0V7os4wTcieODEazumpokg.zzdf2OI7AfLDAawyqXT5y96MEb-t3jqLNuUZDGM1GSYg.JPEG.mainz5217%2FDgOOtYwUwAEoNQ8.jpg&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150729_252%2Ffds5667_1438146535418MHUer_PNG%2F3.PNG&type=sc960_832'
];

const iexUrl = process.env.IEX_API_URL;

const priceRenderer = (data: any) => {
    if (data.delayedPrice) {
        return data.delayedPrice;
    }

    if (data.iexRealtimePrice) {
        return data.iexRealtimePrice;
    }

    if (data.latestPrice) {
        return data.latestPrice;
    }
};

const stockStuffRenderer = async (symbol: string | null) => {
    if (symbol === null) return "Error. Invalid symbol provided.";
    try {
        const data: any = (await axios.get(`https://${iexUrl}/stable/stock/${symbol}/quote`, {
            params: {
                token: process.env.IEX_API_TOKEN
            }
        })).data;
        const price = priceRenderer(data);
        const changePerc = ((data.changePercent < 0) ? '-' : '+') + Math.abs(data.changePercent * 100).toFixed(2);
        let replyMsg = `${data.companyName} (${data.symbol}): ${data.currency} \$${price} (**${changePerc}%**)`;
        if (data.changePercent > 0) {
            replyMsg += ' :rocket: :rocket: :rocket: https://tenor.com/view/hoge-hoge-finance-rise-arrow-gif-21389148';
        } else {
            replyMsg += ' :gem: :raised_hands: https://tenor.com/view/rage-red-stocks-crash-stocks-crashing-downwards-gif-17056650';
        }

        return replyMsg;
    } catch (error) {
        console.error(error);
        return "Error. Couldn't get stock quote.";
    }
}
const weatherRenderer = async (postal: string | null) => {
    try {
        const data: any = (await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${postal},ca&units=metric&appId=${process.env.WEATHER_API_TOKEN}`)).data;
        return "Weather in " + data.name + " - " + data.weather[0].main + ", temp : " + data.main.temp + ", feels like : " + data.main.feels_like + ", humidity : " + data.main.humidity;
    } catch (error) {
        console.error(error);
        return "Error. Couldn't get it.";
    }
}

const pickLunchSpots = async (postal: string | null) => {
    if (postal === null) {
        console.error("Invalid postal code provided by user");
        return 'Invalid postal code.';
    }

    try {
        const geoData = (await gmapClient.geocode({
            params: {
                address: `${postal}, Canada`,
                key: process.env.GMAP_API_KEY || '',
            }
        })).data;

        const lat = geoData.results[0].geometry.location.lat;
        const lng = geoData.results[0].geometry.location.lng;

        const nearbyData = (await gmapClient.placesNearby({
            params: {
                location: [lat, lng],
                radius: 5000,
                type: 'restaurant',
                maxprice: 1,
                opennow: true,
                key: process.env.GMAP_API_KEY || '',
            }
        })).data;

        const processedResults = nearbyData.results.map(data => ({
            name: data.name,
            google_rating: data.rating,
            address: data.vicinity
        }));

        const pickedOne = processedResults[Math.floor(Math.random() * processedResults.length)];

        return `How about lunch from **${pickedOne.name}**\nLocated at ${pickedOne.address}? It has a Google rating of **${pickedOne.google_rating}**`;
    } catch (e) {
        console.error("Failed to fetch nearby restaurants.");
        console.error(e);
        return ''
    }
}

const techQuizRenderer = async (category: string | null) => {
    if (category === null) return "Error. Invalid category provided.";
    try {
        const data: any = (await axios.get(`https://quizapi.io/api/v1/questions`, {
            params: {
                apiKey: process.env.QUIZAPI_API_TOKEN,
                limit: 1,
                category: category
            }
        })).data;

        return data[0];
    } catch (error) {
        console.error(error);
        return "Error. Couldn't get a quiz.";
    }
}

const wait = require('util').promisify(setTimeout);

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch(commandName) {
        case 'fbike':
            console.log('fbike was called.');
            await interaction.reply(bikeFailGifs[Math.floor(Math.random() * bikeFailGifs.length)]);
            break;
        case 'stock':
            await interaction.reply(await stockStuffRenderer(interaction.options.getString('symbol')));
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
            await  interaction.reply(await weatherRenderer(interaction.options.getString('postal')));
            break;
        case 'emperor':
            const tronaldQuoteRaw: any = await getRandomTronaldQuote();
            const formattedQuote = `"${tronaldQuoteRaw.value}" - God Emperor of Mankind`;
            await interaction.reply(formattedQuote);
            break;
        case 'food':
            await interaction.reply(await pickLunchSpots(interaction.options.getString('postal')));
            break;
        case 'quiz':
            const quizData = await techQuizRenderer(interaction.options.getString('category'));
            const quizEmbed = await createQuizEmbed(quizData, false);
            const file = new MessageAttachment('./quiz_boss.jpg');
            await interaction.reply({ embeds: [quizEmbed], files: [file] });
            await wait(10000);
            const quizReplyEmbed = await createQuizEmbed(quizData, true);
            const replyFile = new MessageAttachment('./omitted.jpg');
            await interaction.editReply({ embeds: [quizReplyEmbed], files: [replyFile] });
            break;
        default:
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);
