import * as discord from 'discord.js';
import { Bo4Command } from "./commands/Bo4Command";
import { ICommand } from "./commands/ICommand";

const token = "NTExNTA2NjkzMDQyMDc3NzA2.DtrIvw.UiwFneg2Ts8-dgZtqzUAKybvlME";
const prefix = "!";
const client = new discord.Client();

const commands = ["bo4"];
const map = new Map<string, ICommand>();
map.set("bo4",new Bo4Command());

client.on('ready', () => {
    console.log("I am ready");
});

client.on('message', (message) => {
    
    let args = message.content.slice(prefix.length).trim().split(/ !/g);
    let commandString = args.shift().toLowerCase();    
    let command = map.get(commandString);

    if (command != null){
        command.handleCommand(message);
    }

});

client.login(token);