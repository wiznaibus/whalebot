import "dotenv/config.js";
import { Client, Collection, Events, GatewayIntentBits, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from "./src/types/command";
import { registerCommands } from './src/commands/register';
import { token } from './config.json';

(async () => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    client.slashCommands = new Collection();

    await registerCommands(client);

    await client.login(token);

    client.on(Events.InteractionCreate, async interaction => {
        try {
            const command = interaction.client.slashCommands.get(
                (interaction as ChatInputCommandInteraction).commandName
            );

            await command.execute(interaction as ChatInputCommandInteraction);
        } catch (error) {
            console.error(error);
        }
    });

    console.log('I hope you have a whale of a day!');
})();

// add `slashCommands` to `Client`
declare module 'discord.js' {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
    }
}
