import 'dotenv/config';
import { ActivityType, Client, PresenceUpdateStatus } from 'discord.js';

const client = new Client ({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'],
});

client.on('ready', (c) =>  {
    console.log(`${c.user.username} is online!`);
    try {
        if (client.user) { client.user.setPresence({ status: PresenceUpdateStatus.DoNotDisturb, activities: [{ name: `Reading today's divination...`, type: ActivityType.Custom }] }); }
    } catch (error) {
        console.log(`\u001b[1;31m[ERROR] Could not set Discord Presence due to: ${error}`, `\u001b[0m`);
    }
})

client.login(process.env.TOKEN);