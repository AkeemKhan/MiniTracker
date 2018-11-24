import { ICommand } from './ICommand';
import * as discord from 'discord.js';

export class Bo4Command implements ICommand {   
    public handleCommand(message: discord.Message) {

        let args = message.content.slice(1).trim().split(/ !/g);

        message.channel.send("Handling");
        message.channel.send(args);
    }
}

