import 'dotenv/config';
import commons = require('../lang/lang-common.json');
import { ActivityType, Client, PresenceUpdateStatus } from 'discord.js';
import { getLangJSONText } from "./utils/lang-selector";

const client = new Client ({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'],
});

client.on('ready', (c) =>  {
    try {
        if (client.user) { 
            client.user.setPresence({ 
                    status: PresenceUpdateStatus.DoNotDisturb,
                    activities: [{ name: getLangJSONText('presenceActivity'), type: ActivityType.Custom }]
                }
            ); 
        }
    } catch (error) {
        console.log(`\u001b[31m` + commons.log.error.invalidPresence.replace('{ERROR}', String(error)) + `\u001b[0m`);
    }
    console.log(`\u001b[32m` + commons.log.success.onBotOnline.replace('{CLIENT_USERNAME}', c.user.username) + `\u001b[0m`);
})

client.login(process.env.TOKEN);