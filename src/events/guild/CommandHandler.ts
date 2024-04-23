import { ChatInputCommandInteraction, Collection, EmbedBuilder, Events } from "discord.js";
import BotClient from "../../classes/BotClient";
import Event from "../../classes/Event";
import Command from "../../classes/Command";

export default class CommandHandler extends Event {
    constructor(client: BotClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: "Command handler event",
            once: false,
        })
    }

    Execute(interaction: ChatInputCommandInteraction): void {
        if (!interaction.isChatInputCommand()) { return; }
        const { cooldowns } = this.client;
        const command = this.client.commands.get(interaction.commandName);

        if (!command) {
            this.client.commands.delete(interaction.commandName);
            interaction.reply({ content: "This command does not exist!", ephemeral: true })
            return;
        }
        if (!cooldowns.has(command.name)) { cooldowns.set(command.name, new Collection()); }

        const current = Date.now();
        const timestamp = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if (timestamp?.has(interaction.user.id) && (current < (timestamp?.get(interaction.user.id) || 0) + cooldownAmount)) {
            interaction.reply({ embeds: [new EmbedBuilder()
                .setColor("Red")
                .setDescription(`❌ Please wait another \`${((((timestamp.get(interaction.user.id) || 0) + cooldownAmount) - current) / 1000).toFixed(1)}\``)
            ], ephemeral: true });
            return;
        }

        timestamp?.set(interaction.user.id, current);
        setTimeout(() => timestamp?.delete(interaction.user.id), cooldownAmount);

        try {
            const subcommandGroup = interaction.options.getSubcommandGroup(false);
            const subcommand = `${interaction.commandName}${subcommandGroup ? `.${subcommandGroup}` : ""}.${interaction.options.getSubcommand(false) || ""}`

            this.client.subcommands.get(subcommand)?.Execute(interaction) || command.Execute(interaction);
            return;
        } catch (error) {
            console.log(error);
        }
    }
}