import 'dotenv/config';
import commons = require('../../../lang/lang-common.json');
import { ActivityType, Collection, Events, PresenceUpdateStatus, REST, Routes } from "discord.js";
import BotClient from "../../classes/BotClient";
import Event from "../../classes/Event";
import { getLangJSONText } from '../../utils/LangSelector';
import Command from '../../classes/Command';
import { config } from 'dotenv';

export default class Ready extends Event {
    constructor(client: BotClient) {
        super(client, {
            name: Events.ClientReady,
            description: "Ready event",
            once: true
        });
    }

    private GetJSON(commands: Collection<string, Command>): object[] {
        const data: object[] = [];
        commands.forEach(command => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                default_member_permissions: command.default_member_permissions.toString(),
                dm_permission: command.dm_permissions
            })
        });

        return data;
    }

    async Execute(...args: any) {
        if (this.client.user == null) { throw new Error(`\u001b[31m` + commons.log.error.unavailable + `\u001b[0m`) }

        try {
            this.client.user.setPresence({ 
                status: PresenceUpdateStatus.DoNotDisturb,
                activities: [{ name: getLangJSONText('presenceActivity', this.client.language), type: ActivityType.Custom }]
            }
        ); 
        } catch (error) {
            console.log(`\u001b[31m` + commons.log.error.invalidPresence.replace('{ERROR}', String(error)) + `\u001b[0m`);
        }

        console.log(`\u001b[32m` + commons.log.success.onBotOnline.replace('{CLIENT_USERNAME}', this.client.user.username) + `\u001b[0m`)

        const commands: object[] = this.GetJSON(this.client.commands);
        const rest = new REST().setToken(process.env.TOKEN);
        const setCommands = await rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.HOMEGUILDID), {
            body: commands
        });
    }
}