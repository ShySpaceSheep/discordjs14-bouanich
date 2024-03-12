import { Events } from "discord.js";
import BotClient from "../classes/BotClient";

export default interface IEvent {
    client: BotClient;
    name: Events;
    description: string;
    once: boolean
}