import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../types/command';

export const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping the bot to see if it\'s responsive.'),
    execute: async (interaction) => {
        await interaction.reply('pong');
    },
};
