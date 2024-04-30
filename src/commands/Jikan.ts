import { EmbedBuilder, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import BotClient from "../classes/BotClient";
import Command from "../classes/Command";
import Category from "../enums/Category";
import axios from "axios";

export default class JikanTest extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: "jikan",
            description: "Find an anime!",
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permissions: false,
            cooldown: 3,
            options: []
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const animeName = "Spice and Wolf: The Merchant Meets the Wolf";

        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(animeName)}&limit=1`);
            const anime = response.data.data[0];

            if (anime) {
                await interaction.editReply({ embeds: [new EmbedBuilder()
                    .setColor("Blue")
                    .setThumbnail(`${anime.images.webp.large_image_url}`)
                    .setURL(`${anime.url}`)
                    .setTitle(`${anime.title}`)
                    .setDescription(`${anime.synopsis}`)
                    .addFields(
                        { name: "🏷 **Type**", value: `${anime.type}`, inline: true},
                        { name: "🎞 **Episodes**", value: `${anime.episodes}`, inline: true},
                        { name: "⌛ **Status**", value: `${anime.status}`, inline: true},
                    )
                    .addFields(
                        { name: "📺 **Season**", value: `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}`, inline: true},
                        { name: "🤵 **Studio**", value: `${anime.studios[0].name}`, inline: true},
                        { name: "⚠ **Rating**", value: `${anime.rating}`, inline: true},
                    )
                    .addFields(
                        { name: "🏆 **Rank**", value: `Top ${anime.rank}`, inline: true},
                        { name: "⭐ **Score**", value: `${anime.score}/100`, inline: true},
                        { name: "⭐ **Scored by/Members**", value: `${anime.scored_by}/${anime.members}`, inline: true},
                    )
                    .addFields(
                        { name: "📚 Genres", value:`${anime.genres.map((genre: { name: string; }) => genre.name).join(', ')}`}
                    )
                ]});
            } else {
                await interaction.editReply({ embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`❌ There isn't any record of ${animeName}...`)
                ]});
            }
        } catch (error) {
            console.error(error);
        }
    }
}