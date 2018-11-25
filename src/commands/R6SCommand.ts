import { ICommand } from './ICommand';
import * as discord from 'discord.js';

const config = require("../config.json"); 

export class R6SCommand implements ICommand {   
    public handleCommand(message: discord.Message){
        let args = message.content.slice(config.prefix.length).trim().split(" ");
        console.log("Args - " + args + " " + args.length + " " + config.prefix);

        const Scout = require("@scoutsdk/server-sdk");
        let ninja;
    
        Scout.configure({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            scope: "public.read"
        }).then(async () => {
            let titles = await Scout.titles.list();
            let siege = titles.find(t => t.slug === "r6siege");
            let search = await Scout.players.search("MasterZet_", "uplay", siege.id, true, true);
            console.log(search);
            // search.results[0].persona.id
            let char = await Scout.players.get("r6siege", search.results[0].persona.id);
            console.log(char);
            message.channel.send("Not implemented")
        });
    }
}