import { CommandInteraction, MessageEmbed } from 'discord.js';
import { createQuizEmbed } from './quiz-embed';
import { MessageAttachment } from 'discord.js';
import { QuizRenderer } from './quiz-renderer';
import { CleanQuiz } from './quiz';

const wait = require('util').promisify(setTimeout);

export const WAIT_TIME_MILLISECONDS = 20000;

export const generateQuiz = async (interaction: CommandInteraction): Promise<void> => {
    const cleanQuiz: CleanQuiz = await QuizRenderer.fetchQuizData(interaction.options.getString("category"));
    const quizEmbed: MessageEmbed = createQuizEmbed(cleanQuiz, false);
    const file = new MessageAttachment("./quiz-boss/quiz_boss.jpg");
    await interaction.reply({ embeds: [quizEmbed], files: [file] });
    await wait(WAIT_TIME_MILLISECONDS);
    const quizReplyEmbed = createQuizEmbed(cleanQuiz, true);
    const replyFile = new MessageAttachment("./omitted.jpg");
    await interaction.editReply({ embeds: [quizReplyEmbed], files: [replyFile] });
}