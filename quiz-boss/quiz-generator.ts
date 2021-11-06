import { CommandInteraction, MessageEmbed } from 'discord.js';
import { createQuizEmbed } from './quiz-embed';
import { MessageAttachment } from 'discord.js';
import { QuizRenderer } from './quiz-renderer';
import { CleanQuiz } from './quiz';
import axios from "axios";

const wait = require('util').promisify(setTimeout);

export const WAIT_TIME_MILLISECONDS = 20000;
export const DIRTY_QUIZ_LIMIT = 1;
export const QUIZ_API_URL = "https://quizapi.io/api/v1/questions";

export const generateQuiz = async (interaction: CommandInteraction): Promise<void> => {
    const cleanQuiz: CleanQuiz = await new QuizRenderer(QUIZ_API_URL, process.env.QUIZAPI_API_TOKEN)
        .fetchQuizData(
            interaction.options.getString("category"),
            DIRTY_QUIZ_LIMIT,
            axios.get
        );
    const quizEmbed: MessageEmbed = createQuizEmbed(cleanQuiz, false);
    const file: MessageAttachment = new MessageAttachment("./quiz-boss/quiz_boss.jpg");
    await interaction.reply({ embeds: [quizEmbed], files: [file] });
    await wait(WAIT_TIME_MILLISECONDS);
    const quizReplyEmbed: MessageEmbed = createQuizEmbed(cleanQuiz, true);
    const replyFile: MessageAttachment = new MessageAttachment("./omitted.jpg");
    await interaction.editReply({ embeds: [quizReplyEmbed], files: [replyFile] });
}