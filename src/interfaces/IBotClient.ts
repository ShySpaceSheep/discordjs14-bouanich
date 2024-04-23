import { Collection } from "discord.js";
import Command from "../classes/Command";
import Subcommand from "../classes/Subcommand";

export default interface IBotClient {
    botToken: string;
    language: string;
    commands: Collection<string, Command>;
    subcommands: Collection<string, Subcommand>;
    cooldowns: Collection<string, Collection<string, number>>;

    Init(): void;
    LoadHandlers(): void;
}