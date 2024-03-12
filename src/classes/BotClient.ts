import 'dotenv/config';
import commons = require('../../lang/lang-common.json');
import { Client } from "discord.js";
import IBotClient from "../interfaces/IBotClient";
import Handler from './Handler';

export default class BotClient extends Client implements IBotClient {
    handler: Handler;
    botToken: string;

    constructor() {
        super({ intents: [] });
        this.handler = new Handler(this);
        this.botToken = process.env.TOKEN;
    }

    Init(): void {
        this.LoadHandlers();
        this.login(this.botToken)
            .catch((error) => console.log(`\u001b[31m` + commons.log.error.invalidPresence.replace('{ERROR}', String(error)) + `\u001b[0m`));
    }

    LoadHandlers(): void {
        this.handler.LoadEvents();
    }
}