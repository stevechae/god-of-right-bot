import axios from 'axios';

export const getRandomTronaldQuote = async () => {
    try {
        return (await axios.get('https://www.tronalddump.io/random/quote')).data;
    } catch(error) {
        console.error(error);
        return "Something went wrong with getting quotes...";
    }
}