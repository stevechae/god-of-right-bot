import { CleanQuiz, DirtyQuiz } from "./quiz";
import dirtyQuiz from "./mocks/wtf-case.json";

describe("CleanQuiz", () => {
    describe("new CleanQuiz(dirtyQuiz)", () => {
        it("should handle the edge WTF case.", () => {
            const input: DirtyQuiz = dirtyQuiz;
            const result: CleanQuiz = new CleanQuiz(input);

            expect(result.question).toBe("BASH stands for:");
            expect(result.description).toBe(null);
            expect(result.choices).toStrictEqual([ { A: "Bourne Again SHell" }, { B: "BAsic SHell" }, { C: "Basic Async SHell" } ]);
            expect(result.answers).toStrictEqual([ "A" ]);
            expect(result.explanation).toBe(null);
            expect(result.tip).toBe(null);
            expect(result.tags).toStrictEqual([ { name: "BASH" } ]);
            expect(result.category).toBe("Linux");
            expect(result.difficulty).toBe("Easy");
        })
    })
})