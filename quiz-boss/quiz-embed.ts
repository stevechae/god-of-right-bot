import { MessageEmbed } from 'discord.js';
import { Choice, CleanQuiz } from './quiz';
import { WAIT_TIME_MILLISECONDS } from './quiz-generator';

export const createQuizEmbed = (quizData: CleanQuiz, isReply: boolean): MessageEmbed => {
    const embed =  new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`Question : ${quizData.question}`)
        .addFields(
            quizData.choices.map((choice: Choice) => {
                return { 
                    name: choice.name,
                    value: choice.value,
                }
            })
        )
        .setThumbnail("attachment://quiz_boss.jpg");;

    if (isReply) {
        embed.setImage("attachment://omitted.jpg");
        embed.addField("Answer(s) : ", quizData.answers.toString())
    } else {
        embed.addField(
            "Answer : ", 
            `The answer will be revealed in ${WAIT_TIME_MILLISECONDS / 1000} seconds.`
        )
    }

    return embed;
}