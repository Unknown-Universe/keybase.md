import { Client } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Command } from "./types/command";

dotenv.config();

export const client = new Client({
    intents: 32767,
    partials: ["CHANNEL", "MESSAGE", "REACTION"],
});

const commandDir = path.join(__dirname, "commands");
const eventDir = path.join(__dirname, "events");
export const commands: Array<Command> = [];

for (const file of fs.readdirSync(commandDir)) {
    if (!file.endsWith(".js")) continue;
    commands.push(require(path.join(commandDir, file)).default as Command);
}

for (const file of fs.readdirSync(eventDir)) {
    if (!file.endsWith(".js")) continue;
    require(path.join(eventDir, file));
}

client.login(process.env.TOKEN!);
