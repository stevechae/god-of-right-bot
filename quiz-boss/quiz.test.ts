import { CleanQuiz, DirtyQuiz } from "./quiz";
import dirtyQuizWTFCase from "./mocks/wtf-case.json";
import dirtyQuizLinux from "./mocks/linux-quiz.json";
import dirtyQuizDevOps from "./mocks/devops-quiz.json";

describe("CleanQuiz", () => {
    describe("new CleanQuiz(dirtyQuiz)", () => {
        it("should handle the edge WTF case.", () => {
            const input: DirtyQuiz = dirtyQuizWTFCase;
            const result: CleanQuiz = new CleanQuiz(input);

            expect(result.question).toBe("BASH stands for:");
            expect(result.description).toBe(null);
            expect(result.choices).toStrictEqual([ 
                { name: "A", value: "Bourne Again SHell" }, 
                { name: "B", value: "BAsic SHell" }, 
                { name: "C", value: "Basic Async SHell" } 
            ]);
            expect(result.answers).toStrictEqual([ "A" ]);
            expect(result.explanation).toBe(null);
            expect(result.tip).toBe(null);
            expect(result.category).toBe("Linux");
            expect(result.difficulty).toBe("Easy");
        })

        it("should handle a Linux quiz.", () => {
            const input: DirtyQuiz = dirtyQuizLinux;
            const result: CleanQuiz = new CleanQuiz(input);

            expect(result.question).toBe("How to scale a replicaset named 'foo' to 3?");
            expect(result.description).toBe(null);
            expect(result.choices).toStrictEqual([ 
                { name: "A", value: "kubectl scale --replicas=3 rs/foo" }, 
                { name: "B", value: "kubectl up --replicas=3 rs/foo" }, 
                { name: "C", value: "kubectl update --replicas=3 rs/foo" },
                { name: "D", value: "kubectl deploy  --replicas=3 rs/foo" } 
            ]);
            expect(result.answers).toStrictEqual([ "A" ]);
            expect(result.explanation).toBe(null);
            expect(result.tip).toBe(null);
            expect(result.category).toBe("Linux");
            expect(result.difficulty).toBe("Hard");
        })

        it("should handle a DevOps quiz.", () => {
            const input: DirtyQuiz = dirtyQuizDevOps;
            const result: CleanQuiz = new CleanQuiz(input);

            expect(result.question).toBe("As soon a service starts, ________ daemon running on each node add a set of environment variables on the pod for each active service.");
            expect(result.description).toBe(null);
            expect(result.choices).toStrictEqual([ 
                { name: "A", value: "Kubectl" }, 
                { name: "B", value: "Service discovery" }, 
                { name: "C", value: "Kubeadm" },
                { name: "D", value: "Kubelet" } 
            ]);
            expect(result.answers).toStrictEqual([ "D" ]);
            expect(result.explanation).toBe(null);
            expect(result.tip).toBe(null);
            expect(result.category).toBe("DevOps");
            expect(result.difficulty).toBe("Easy");
        })
    })
})