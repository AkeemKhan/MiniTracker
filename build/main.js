"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord = require("discord.js");
var Bo4Command_1 = require("./commands/Bo4Command");
var token = "NTExNTA2NjkzMDQyMDc3NzA2.DtrIvw.UiwFneg2Ts8-dgZtqzUAKybvlME";
var prefix = "!";
var client = new discord.Client();
var commands = ["bo4"];
var map = new Map();
map.set("bo4", new Bo4Command_1.Bo4Command());
client.on('ready', function () {
    console.log("I am ready");
});
client.on('message', function (message) {
    if (message.author.bot)
        return;
    if (message.content.indexOf(prefix) !== 0)
        return;
    var args = message.content.slice(prefix.length).trim().split(/ !/g);
    var commandString = args.shift().toLowerCase();
    var command = map.get(commandString);
    if (command != null) {
        command.handleCommand(message, args);
    }
});
client.login(token);
//# sourceMappingURL=main.js.map