import * as discord from 'discord.js';
import { Bo4Command } from "./commands/Bo4Command";
import { DeathCommand } from "./commands/DeathCommand"
import { R6SCommand } from "./commands/R6SCommand"
import { ICommand } from "./commands/ICommand";

const config = require("./config.json");
const client = new discord.Client();

const commands = ["bo4"];
const map = new Map<string, ICommand>();

client.on('ready', () => {
    console.log("Bot up and running.");
    map.set("bo4", new Bo4Command());
    map.set("death", new DeathCommand());
    map.set("r6s", new R6SCommand());
});

client.on('message', (message) => {
    
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;

    let args = message.content.slice(config.prefix.length).trim().split(/ /g);
    let commandString = args[0].toLowerCase();    

    console.log("Command " + commandString);

    let command = map.get(commandString);

    if (command != null) {
        command.handleCommand(message);
    }

});

client.login(config.token);