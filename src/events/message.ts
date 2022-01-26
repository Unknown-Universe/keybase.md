import { client, commands } from "..";

client.on("messageCreate", async (message) => {
    try {
        if (!message.guild || message.author.bot) {
            return;
        }
        const prefix = process.env.PREFIX!;

        const ping = `<@${client.user!.id}>`;
        const nick = `<@!${client.user!.id}>`;
        let text = message.content;
        let mentioned: boolean;

        if (text.startsWith(prefix)) {
            text = text.slice(prefix.length).trimStart();
            mentioned = false;
        } else if (text.startsWith(ping)) {
            text = text.slice(ping.length).trimStart();
            mentioned = true;
        } else if (text.startsWith(nick)) {
            text = text.slice(nick.length).trimStart();
            mentioned = true;
        } else {
            return;
        }

        const [name, ...args] = text.split(" ");
        if (!name.length) {
            if (mentioned) {
                await message.reply(`This servers prefix is ${prefix}`);
            }
            return;
        }

        const command = commands.find(
            (command) =>
                command.name.toLowerCase() === name.toLowerCase() ||
                command.aliases.includes(name.toLowerCase())
        );

        if (!command) return;

        if (args[0] === "usage" && command.usage.length) {
            await message.reply(`Usage: ${prefix}${command.usage}`);
            return;
        } else if (args[0] === "aliases") {
            await message.reply(
                `Aliases: ${
                    prefix +
                    command.name +
                    ", " +
                    prefix +
                    command.aliases.join(`, ${prefix}`)
                }`
            );
            return;
        }

        await command.run(message, ...args);
    } catch (error) {
        message.reply(`Unknown Error ${error}`);
        console.error(error);
        return;
    }
});
