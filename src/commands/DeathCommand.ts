import { ICommand } from './ICommand';
import * as discord from 'discord.js';

const config = require("../config.json"); 
const fs = require('fs');

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
        
        var files = fs.readdirSync('src/assets/deathsounds/');       
        let chosenFile = files[Math.floor(Math.random() * files.length)] 
        console.log(chosenFile);

        const listener = connection.playFile("src/assets/deathsounds/" + chosenFile); 
            listener.on('end', () => setTimeout(() => connection.disconnect(), 1000));
            listener.once('error', (err) => {
                console.log("Error in listener");
                connection.disconnect();
            });
    }
}