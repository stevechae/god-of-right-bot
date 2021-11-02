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
})