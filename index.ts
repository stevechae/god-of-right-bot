import { Client, Intents } from 'discord.js';
import axios from 'axios';
import { Client as GMapClient } from '@googlemaps/google-maps-services-js';
import { getRandomTronaldQuote } from './tronald_quotes';
import { generateQuiz } from './quiz-boss/quiz-generator';
import { bikeFailGifs } from './memes/bike-fail-gifs.json';
import { kimsungmoImgs } from './memes/ksm.json';

const client = new Client({intents: [Intents.FLAGS.GUILDS] });

const gmapClient = new GMapClient({});

client.once('ready', () => {
    console.log('Ready!');
});

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
            generateQuiz(interaction);
            break;
        default:
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);
