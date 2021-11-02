import { AxiosRequestConfig, AxiosResponse } from "axios";
import { CleanQuiz, DirtyQuiz } from "./quiz";
import { QuizRenderer } from "./quiz-renderer"

describe("QuizRenderer", () => {
    describe("new QuizRenderer(quizApiUrl, apiKey)", () => {
        it("should create a new class instance.", () => {
            expect(() => { new QuizRenderer("test_api_url", "test_api_key") }).not.toThrowError();
        })

        it("should throw a new Error if quizApiUrl is missing.", () => {
            expect(() => { new QuizRenderer("", "test_api_key") }).toThrowError(new Error("Quiz API URL is missing."));
        })

        it("should throw a new Error if apiKey is missing 1.", () => {
            expect(() => { new QuizRenderer("test_api_url", undefined) }).toThrowError(new Error("API Key is missing."));
        })

        it("should throw a new Error if apiKey is missing 2.", () => {
            expect(() => { new QuizRenderer("test_api_url", "") }).toThrowError(new Error("API Key is missing."));
        })
    })

    describe("fetchQuizData(category, limit, fetchDirtyQuiz)", () => {
        it("should return Promise<CleanQuiz>", () => {
            const dirtyQuiz = {
                id: 1,
                question: "?",
                description: null,
                answers: { answer_a: "X" },
                multiple_correct_answers: "false",
                correct_answers: { answer_a_correct: "false" },
                correct_answer: "answer_a",
                explanation: null,
                tip: null,
                category: "Linux",
                difficulty: "EZ",
            };
            const quizApiUrl = "test_api_url";
            const axiosResponse: AxiosResponse<DirtyQuiz[]> = {
                data: [dirtyQuiz],
                status: 200,
                statusText: "OK",
                headers: {
                    "test_key": "test_value"
                },
                config: {}
              }
            const fetchQuizData = (quizApiUrl: string, config?: AxiosRequestConfig<DirtyQuiz[]>) => Promise.resolve(axiosResponse);
            const result: Promise<CleanQuiz> = new QuizRenderer(quizApiUrl, "test_api_key").fetchQuizData("Linux", 1, fetchQuizData);

            result.then((cleanQuiz: CleanQuiz) => {
                expect(cleanQuiz.question).toBe("?");
                expect(cleanQuiz.description).toBe(null);
                expect(cleanQuiz.choices).toStrictEqual([ { name: "A", value: "X" } ]);
                expect(cleanQuiz.answers).toStrictEqual([]);
                expect(cleanQuiz.explanation).toBe(null);
                expect(cleanQuiz.tip).toBe(null);
                expect(cleanQuiz.category).toBe("Linux");
                expect(cleanQuiz.difficulty).toBe("EZ");
            });
        })
    })
})