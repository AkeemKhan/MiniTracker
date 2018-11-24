import * as discord from 'discord.js';

interface ICommand {    
    handleCommand(message: discord.Message);
}

export { ICommand };