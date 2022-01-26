import { client } from "..";
import { leaveMessage, welcomeMessage } from "../utils/constants";

client.on("guildMemberAdd", async (member) => {
    if (member.user.bot) return;

    const welcomeChannel = client.guilds.cache
        .get(process.env.GUILD_ID!)
        ?.channels.cache.get(process.env.WELCOME_CHANNEL_ID!)!;

    if (welcomeChannel.type !== "GUILD_TEXT") return;

    welcomeChannel.send(welcomeMessage);
});

client.on("guildMemberRemove", async (member) => {
    if (member.user.bot) return;

    const welcomeChannel = client.guilds.cache
        .get(process.env.GUILD_ID!)
        ?.channels.cache.get(process.env.WELCOME_CHANNEL_ID!)!;

    if (welcomeChannel.type !== "GUILD_TEXT") return;

    welcomeChannel.send(leaveMessage);
});
