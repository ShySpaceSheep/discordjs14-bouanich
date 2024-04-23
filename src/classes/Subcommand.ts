import { ChatInputCommandInteraction, CacheType } from "discord.js";
import ISubcommand from "../interfaces/ISubcommand";
import BotClient from "./BotClient";
import ICommandOptions from "../interfaces/ICommandOptions";
import ISubcommandOptions from "../interfaces/ISubcommandOptions";

export default class Subcommand implements ISubcommand {
    client: BotClient;
    name: string;

    constructor(client: BotClient, options: ISubcommandOptions) {
        this.client = client;
        this.name = options.name;
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
    }  
}