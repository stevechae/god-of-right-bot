import axios from "axios";

export const techQuizRenderer = async (category: string | null) => {
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