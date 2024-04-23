import 'dotenv/config';
import commons = require('../../lang/lang-common.json');
import { Client, Collection } from "discord.js";
import IBotClient from "../interfaces/IBotClient";
import Handler from './Handler';
import { setGlobalLanguage } from '../utils/LangSelector';
import Command from './Command';
import Subcommand from './Subcommand';

export default class BotClient extends Client implements IBotClient {
    handler: Handler;
    botToken: string;
    language: string;
    commands: Collection<string, Command>;
    subcommands: Collection<string, Subcommand>;
    cooldowns: Collection<string, Collection<string, number>>;

    constructor() {
        super({ intents: [] });
        this.handler = new Handler(this);
        this.botToken = process.env.TOKEN;
        this.language = setGlobalLanguage();

        this.commands = new Collection();
        this.subcommands = new Collection();
        this.cooldowns = new Collection();
    }
    

    Init(): void {
        this.LoadHandlers();
        this.login(this.botToken)
            .catch((error) => console.log(`\u001b[31m` + commons.log.error.invalidPresence.replace('{ERROR}', String(error)) + `\u001b[0m`));
    }

    LoadHandlers(): void {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
    }
}