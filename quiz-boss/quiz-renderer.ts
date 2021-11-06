import { AxiosRequestConfig, AxiosResponse } from "axios";
import { CleanQuiz, DirtyQuiz } from "./quiz";

export class QuizRenderer {
    private readonly quizApiUrl: string;
    private readonly apiKey: string | undefined;

    constructor(quizApiUrl: string, apiKey: string | undefined) {
        if (quizApiUrl.trim().length === 0) {
            throw new Error("Quiz API URL is missing.");
        }

        if (!apiKey || (apiKey && apiKey.trim().length === 0)) {
            throw new Error("API Key is missing.");
        }

        this.quizApiUrl = quizApiUrl;
        this.apiKey = apiKey;
    }

    public async fetchQuizData(
        category: string | null,
        limit: number,
        fetchDirtyQuiz: (quizApiUrl: string, config?: AxiosRequestConfig<DirtyQuiz[]>) => Promise<AxiosResponse<DirtyQuiz[]>>
    ): Promise<CleanQuiz> {
        if (!category) {
            throw new Error("Invalid category provided.");
        }

        try {
            const response: AxiosResponse<DirtyQuiz[]> = await fetchDirtyQuiz(this.quizApiUrl, {
                params: {
                    apiKey: this.apiKey,
                    limit: limit,
                    category: category
                }
            });

            if (response.data.length === limit) {
                return new CleanQuiz(response.data[0]);
            } else {
                throw new Error("Not enough data.");
            }
        } catch (error) {
            throw new Error("Couldn't get a quiz.");
        }
    }
}