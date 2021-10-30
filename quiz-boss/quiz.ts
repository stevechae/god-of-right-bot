// QuizAPI : https://quizapi.io/docs/1.0/category
export interface DirtyQuiz {
    readonly id: number;
    readonly question: string;
    readonly description: string | null;
    readonly answers: { [choice: string]: string | null };
    readonly multiple_correct_answers: string;
    readonly correct_answers: { [choice: string]: string };
    readonly correct_answer: string | null;
    readonly explanation: string | null;
    readonly tip: string | null;
    readonly category: string;
    readonly difficulty: string;
}

export interface Choice {
    readonly name: string;
    readonly value: string;
}

export class CleanQuiz {
    readonly question: string;
    readonly description: string | null;
    readonly choices: Choice[];
    readonly answers: string[];
    readonly explanation: string | null;
    readonly tip: string | null;
    readonly category: string;
    readonly difficulty: string;

    constructor(dirtyQuiz: DirtyQuiz) {
        this.question = dirtyQuiz.question;
        this.description = dirtyQuiz.description;
        this.choices = parseChoicesFrom(dirtyQuiz);
        this.answers = parseAnswersFrom(dirtyQuiz);
        this.explanation = dirtyQuiz.explanation;
        this.tip = dirtyQuiz.tip;
        this.category = dirtyQuiz.category;
        this.difficulty = dirtyQuiz.difficulty;
    }
}

const ANSWER_KEY_LENGTH = 8;
const CORRECT_ANSWER_KEY_LENGTH = 16;

const parseChoicesFrom = (dirtyQuiz: DirtyQuiz): Choice[] => {
    const result: Choice[] = [];
    for (const [key, value] of Object.entries(dirtyQuiz.answers)) {
        if (key && value && key.length === ANSWER_KEY_LENGTH) {
            result.push( { name: capitalizeChoice(key), value: value } );
        }
    }
    return result;
}

const capitalizeChoice = (answerKey: string): string => answerKey.charAt(7).toUpperCase();

const parseAnswersFrom = (dirtyQuiz: DirtyQuiz): string[] => {
    if (!dirtyQuiz.multiple_correct_answers || typeof dirtyQuiz.multiple_correct_answers !== 'string') {
        console.debug('QuizAPI : type of `multiple_correct_answers` should be string and its value should be non-null.');
        return [];
    }

    if (dirtyQuiz.correct_answer && typeof dirtyQuiz.correct_answer !== 'string') {
        console.debug(`QuizAPI : type of 'correct_answer' should be string, but it was ${typeof dirtyQuiz.correct_answer}`);
        return [];
    }

    if (
        dirtyQuiz.correct_answer &&
        dirtyQuiz.multiple_correct_answers.trim() === 'false' &&  
        dirtyQuiz.correct_answer.trim().length === CORRECT_ANSWER_KEY_LENGTH
    ) {
        return [ capitalizeChoice(dirtyQuiz.correct_answer.trim()) ];
    }

    if (dirtyQuiz.multiple_correct_answers.trim() === 'true' || dirtyQuiz.correct_answer) {
        return transformCorrectAnswers(dirtyQuiz);
    }

    // WTF case. See ./quiz-boss/mocks/wtf-case.json
    if (!dirtyQuiz.correct_answer && dirtyQuiz.multiple_correct_answers.trim() === 'false') {
        return transformCorrectAnswers(dirtyQuiz);
    }

    return [];
}

const transformCorrectAnswers = (dirtyQuiz: DirtyQuiz): string[] => {
    if (
        dirtyQuiz.correct_answers &&
        typeof dirtyQuiz.correct_answers === 'object'
    ) {
        return Object.keys(dirtyQuiz.correct_answers)
            .filter((key: string) => dirtyQuiz.correct_answers[key] === 'true')
            .map((key: string) => capitalizeChoice(key.trim()));
    } else {
        console.debug('QuizAPI : type of `correct_answers` should be object.');
        return [];
    }
}
