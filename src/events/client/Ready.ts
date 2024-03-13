import commons = require('../../../lang/lang-common.json');
import { ActivityType, Events, PresenceUpdateStatus } from "discord.js";
import BotClient from "../../classes/BotClient";
import Event from "../../classes/Event";
import { getLangJSONText } from '../../utils/LangSelector';

export default class Ready extends Event {
    constructor(client: BotClient) {
        super(client, {
            name: Events.ClientReady,
            description: "Ready event",
            once: true
        });
    }

    Execute(...args: any): void {
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
    }
}