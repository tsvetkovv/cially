const { Events } = require("discord.js");
const cfonts = require("cfonts");
const { debug } = require('../terminal/debug');
const { error } = require('../terminal/error');


module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(message) {
    debug({text: `New Message: \nAuthor: ${message.author.username}\nGuild: ${message.guild.name}, ${message.guild.id}\nContent: ${message.content} \n`});

  },
}