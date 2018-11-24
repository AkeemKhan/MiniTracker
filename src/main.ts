import * as discord from 'discord.js';
import { Bo4Command } from "./commands/Bo4Command";
import { ICommand } from "./commands/ICommand";

const config = require("./config.json");
const client = new discord.Client();

const commands = ["bo4"];
const map = new Map<string, ICommand>();
map.set("bo4",new Bo4Command());

client.on('ready', () => {
    console.log("I am ready");
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