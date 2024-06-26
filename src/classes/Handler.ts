import path = require("path");
import IHandler from "../interfaces/IHandler";
import BotClient from "./BotClient";
import { glob } from 'glob';
import Event from "./Event";
import Subcommand from "./Subcommand";
import Command from "./Command";

export default class Handler implements IHandler {
    client: BotClient;
    constructor(client: BotClient) {
        this.client = client;
    }

    async LoadEvents() {
        const eventFiles = (await glob(`dist/src/events/**/*.js`)).map(filePath => path.resolve(filePath));

        eventFiles.map( async (file: string) => {
            const event: Event = new(await import(file)).default(this.client);
            if (!event.name) { return delete require.cache[require.resolve(file)]; }

            const execute = (...args: any) => event.Execute(...args);

            if (event.once) {
                //@ts-ignore
                this.client.once(event.name, execute);
            } else {
                //@ts-ignore
                this.client.on(event.name, execute);
            }

            return delete require.cache[require.resolve(file)];
        });
    }

    async LoadCommands() {
        const commandFiles = (await glob(`dist/src/commands/**/*.js`)).map(filePath => path.resolve(filePath));

        commandFiles.map( async (file: string) => {
            const command: Command | Subcommand = new(await import(file)).default(this.client);
            if (!command.name) { return delete require.cache[require.resolve(file)]; }

            if (file.split("/").pop()?.split(".")[2]) { return this.client.subcommands.set(command.name, command); }
            this.client.commands.set(command.name, command as Command);

            return delete require.cache[require.resolve(file)];
        });
    }
}