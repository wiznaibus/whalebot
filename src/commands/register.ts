import { Client, REST } from 'discord.js';
import { APIApplicationCommand, Routes } from 'discord-api-types/v10';
import { clientId, token } from '../../config.json';

// import the test command
import { command } from './utility/ping';

export async function registerCommands(client: Client) {
    const rest = new REST({ version: '10' }).setToken(token);

    // get registered commands
    const applicationCommands = await rest.get(Routes.applicationCommands(clientId));

    // hardcore the command for testing
    client.slashCommands.set("ping", command);

    // register the command (can skip if it's already registered)
    if ((applicationCommands as APIApplicationCommand[]).filter(command =>
        command.name === "ping").length === 0
    ) {
        try {
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: [command.data.toJSON()] },
            );
        } catch (error) {
            console.error(error);
        }
    }
}
