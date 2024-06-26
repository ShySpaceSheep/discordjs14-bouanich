import { ChatInputCommandInteraction, CacheType, AutocompleteInteraction } from "discord.js";
import Category from "../enums/Category";
import ICommand from "../interfaces/ICommand";
import BotClient from "./BotClient";
import ICommandOptions from "../interfaces/ICommandOptions";

export default class Command implements ICommand {
    client: BotClient;
    name: string;
    description: string;
    category: Category;
    options: object;
    default_member_permissions: bigint;
    dm_permissions: boolean;
    cooldown: number;

    constructor(client: BotClient, options: ICommandOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.category = options.category;
        this.options = options.options;
        this.default_member_permissions = options.default_member_permissions;
        this.dm_permissions = options.dm_permissions;
        this.cooldown = options.cooldown;
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
    }
    AutoComplete(interaction: AutocompleteInteraction<CacheType>): void {
    }
}