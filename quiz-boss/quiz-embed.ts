import { MessageEmbed } from 'discord.js';
import { WAIT_TIME_MILLISECONDS } from './quiz-generator';

export const createQuizEmbed = async (quizData: any, isReply: boolean): Promise<MessageEmbed> => {
    // https://quizapi.io/docs/1.0/category
    const embed =  new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Question : ${quizData.question}`)
        .addFields(
            Object.keys(quizData.answers)
                .filter(key => quizData.answers[key] !== null)
                .map(key => {
                    return { 
                        name: `${key.charAt(7).toUpperCase()} : `,
                        value: quizData.answers[key],
                    }
                })
        )
        .setThumbnail('attachment://quiz_boss.jpg');;

    if (isReply) {
        embed.setImage('attachment://omitted.jpg');

        if (quizData.multiple_correct_answers === 'false' && quizData.correct_answer) {
            embed.addField("Answer : ", quizData.correct_answer.charAt(7).toUpperCase())
        } else if (quizData.multiple_correct_answers === 'true') {
            embed.addField("Answers : ", transformCorrectAnswers(quizData).toString());
        }

        if (quizData.explanation) {
            embed.addField("Explanation : ", quizData.explanation);
        }

        handleWhatTheFuckCase(quizData, embed);
    } else {
        embed.addField(
            "Answer : ", 
            `The answer will be revealed in ${WAIT_TIME_MILLISECONDS / 1000} seconds.`
        )
    }

    return embed;
}

const handleWhatTheFuckCase = (quizData: any, embed: MessageEmbed): void => {
    if (quizData.multiple_correct_answers === 'false' && !quizData.correct_answer) {
        // WTF case...
        // Example response...
        // {
        //     id: 823,
        //     question: 'BASH stands for:',
        //     description: null,
        //     answers: {
        //       answer_a: 'Bourne Again SHell',
        //       answer_b: 'BAsic SHell',
        //       answer_c: 'Basic Async SHell',
        //       answer_d: null,
        //       answer_e: null,
        //       answer_f: null
        //     },
        //     multiple_correct_answers: 'false',
        //     correct_answers: {
        //       answer_a_correct: 'true',
        //       answer_b_correct: 'false',
        //       answer_c_correct: 'false',
        //       answer_d_correct: 'false',
        //       answer_e_correct: 'false',
        //       answer_f_correct: 'false'
        //     },
        //     correct_answer: null,
        //     explanation: null,
        //     tip: null,
        //     tags: [ { name: 'BASH' } ],
        //     category: 'Linux',
        //     difficulty: 'Easy'
        //   }
        embed.addField("Answers : ", transformCorrectAnswers(quizData).toString());
    }
}

const transformCorrectAnswers = (quizData: any): any[] => {
        // Part of example response body : 
        // correct_answers: {
        //   answer_a_correct: 'true',
        //   answer_b_correct: 'false',
        //   answer_c_correct: 'false',
        //   answer_d_correct: 'false',
        //   answer_e_correct: 'false',
        //   answer_f_correct: 'false'
        // },
    return Object.keys(quizData.correct_answers)
        .filter(key => quizData.correct_answers[key] === 'true')
        .map(key => {
            return key.charAt(7).toUpperCase();
        });
}