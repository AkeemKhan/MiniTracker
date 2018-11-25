import { ICommand } from './ICommand';
import * as discord from 'discord.js';

const config = require("../config.json"); 

export class R6SCommand implements ICommand {   
    public handleCommand(message: discord.Message){

        let args = message.content.slice(config.prefix.length).trim().split(" ");
        const Scout = require("@scoutsdk/server-sdk");
    
        if (args.length > 1) {
            
            let name = args[1];

            Scout.configure({
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                scope: "public.read"
            }).then(async () => {
                let titles = await Scout.titles.list();
                let siege = titles.find(t => t.slug === "r6siege");
                let search = await Scout.players.search(name, "uplay", siege.id, true, true);

                if (search == null){
                    message.channel.send("Search criteria failed");
                    console.log("Search criteria failed");
                }
                else {
                    message.channel.send("Searching...");
                    console.log("Searching...");
                    let char = await Scout.players.get("r6siege", search.results[0].persona.id).then((result) => {                        
                        let playerStatsOutput = "```\n";  
                            
                        for (let entry of result.stats) {
                            playerStatsOutput += "\n" + entry.metadata["name"] + ": " + entry.value;
                        }
                            
                        message.channel.send(playerStatsOutput + "\n```");
                    }).catch((err) => {
                        message.channel.send("Search Player failed");
                        console.log("Search Player failed");
                    });;
                }
            });            
        }
    }
}