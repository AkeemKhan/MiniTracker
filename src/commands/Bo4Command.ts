import { ICommand } from './ICommand';
import * as discord from 'discord.js';

const config = require("../config.json"); 

export class Bo4Command implements ICommand {   
    
    public handleCommand(discordMessenger: discord.Message) {

        let args = discordMessenger.content.slice(config.prefix.length).trim().split(" ");
        console.log("Args - " + args + " " + args.length + " " + config.prefix);

        if (args.length === 3) {
            let name = args[1];
            let mode = args[2];

            console.log(name);
            console.log(mode);

            if (mode === "blackout")
                this.BlackoutRequest(name, discordMessenger);
            else if (mode === "multiplayer")
                this.MultiplayerRequest(name, discordMessenger);
        }
    }

    public BlackoutRequest(accountName: string, message: discord.Message) {
        
        var endpoint = "https://cod-api.theapinetwork.com/api/stats/bo4/" + accountName.replace("#","-") + "/bnet?type=blackout";
        console.log(endpoint);
        message.channel.send("Searching...");
        
        var rp = require('request-promise');

        var options = {
            uri: endpoint,            
            json: true 
        };
        
        rp(options)
            .then((repos) => this.OutputResponse(repos, message))            
            .catch((err) => this.handleError(err, message));
    }

    public MultiplayerRequest(accountName: string, message: discord.Message) {        
        message.channel.send("Not implemented");
    }

    public OutputResponse(response, message) {

        var username = response["user"]["username"].split("#")[0];
        var mode = "Blackout";
        var level = response["stats"]["level"];
        var kills = response["stats"]["kills"];
        var revives = response["stats"]["revives"];
        var wins = response["stats"]["wins"];
        var games = response["stats"]["gamesplayed"];
        var kdRatio = parseInt(kills) / parseInt(games);
        
        var outputMessage = "```\n"
            + username + "\n"
            + mode + "\n"
            + "Level:      " + level + "\n"
            + "Kills:      " + kills + "\n"
            + "Revives:    " + revives + "\n"
            + "Victories:  " + wins + "\n"
            + "Played:     " + games + "\n"
            + "KD Ratio:   " + kdRatio  
            + "```";
        
        message.channel.send(outputMessage);
        console.log(outputMessage);
    }

    public handleError(response, message) {
        message.channel.send(response);
        console.log(response);
    }
}

