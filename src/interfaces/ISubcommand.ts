import { ChatInputCommandInteraction } from "discord.js";
import BotClient from "../classes/BotClient"

export default interface ISubcommand {
    client: BotClient;
    name: string;

    Execute(interaction: ChatInputCommandInteraction): void;
}