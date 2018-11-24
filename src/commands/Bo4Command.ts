import { ICommand } from './ICommand';
import * as discord from 'discord.js';

export class Bo4Command implements ICommand {   
    public handleCommand(message: discord.Message) {
        message.channel.send("Handling");
        message.channel.send(message.content);
    }
}

