import * as discord from 'discord.js';

export interface ICommand {    
    handleCommand(message: discord.Message);
}
