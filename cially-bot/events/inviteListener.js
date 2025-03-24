// Imports
const { Events } = require("discord.js");
const cfonts = require("cfonts");
const { debug } = require('../terminal/debug');
const { error } = require('../terminal/error');

// Main Event
module.exports = {
  name: Events.InviteCreate,
  execute(invite) {

    
    // Logs
    debug({text: `New Invite: \nGuild: ${invite.guild.name}, ${invite.guild}\nChannel: ${invite.channel.name}, ${invite.channelId}\n`});
  },
};
