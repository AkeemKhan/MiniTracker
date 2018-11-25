import { ICommand } from './ICommand';
import * as discord from 'discord.js';

const config = require("../config.json"); 

export class DeathCommand implements ICommand {       
    public handleCommand(message: discord.Message){
        var voiceChannel = message.member.voiceChannel;
        if (voiceChannel != null) {
            const voiceChannel = message.member.voiceChannel;
            voiceChannel.join().then(con => {
                this.PlayRandomFile(con, voiceChannel);
            }).catch(error => {
                console.log(error);
                voiceChannel.leave();
            });           
        }        
    }

    public PlayRandomFile(connection: discord.VoiceConnection, voiceChannel: discord.VoiceChannel) {
        const listener = connection.playFile('src/assets/deathsounds/mb_1.mp3'); 
            listener.on('end', () => setTimeout(() => connection.disconnect(), 1000));
            listener.once('error', (err) => {
                console.log("Error in listener");
                connection.disconnect();
            });
    }
}