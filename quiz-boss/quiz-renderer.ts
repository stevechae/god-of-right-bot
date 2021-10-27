import axios, { AxiosResponse } from "axios";
import { CleanQuiz, DirtyQuiz } from "./quiz";

export class QuizRenderer {
    private static LIMIT = 1;
    private static QUIZ_API_URL = "https://quizapi.io/api/v1/questions";

    private constructor() {}

    public static async fetchQuizData(category: string | null): Promise<CleanQuiz> {
        if (category === null) {
            return Promise.reject(new Error("Invalid category provided."));
        }

        try {
            const response: AxiosResponse<DirtyQuiz[]> = await axios.get(this.QUIZ_API_URL, {
                params: {
                    apiKey: process.env.QUIZAPI_API_TOKEN,
                    limit: this.LIMIT,
                    category: category
                }
            });

            if (response.data.length === this.LIMIT) {
                return new CleanQuiz(response.data[0]);
            } else {
                return Promise.reject(new Error("Not enough data."));
            }
        } catch (error) {
            return Promise.reject(new Error("Couldn't get a quiz."));
        }
    }
}