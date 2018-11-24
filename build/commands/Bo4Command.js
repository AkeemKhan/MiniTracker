"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bo4Command = /** @class */ (function () {
    function Bo4Command() {
    }
    Bo4Command.prototype.handleCommand = function (message) {
        message.channel.send("Handling");
        message.channel.send(message.content);
    };
    return Bo4Command;
}());
exports.Bo4Command = Bo4Command;
//# sourceMappingURL=Bo4Command.js.map