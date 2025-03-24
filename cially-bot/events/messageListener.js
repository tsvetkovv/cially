// Imports
const { Events } = require("discord.js");
const cfonts = require("cfonts");
const { debug } = require('../terminal/debug');
const { error } = require('../terminal/error');
const get = require('simple-get')


// Event
module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(message) {

    // Get the number of words per message
    const totalWords = message.content.trim().split(/\s+/).filter(word => word.length > 0);


    let info = {"guildId": message.guild.id, "messageId": message.id}

    const opts = {
      url: 'http://localhost:3000/api/server/2136',
      body: JSON.stringify(info)
    }

    /* get.post(opts, function (err, res) {
      debug({text: `HTTP Request sent`});
      if (err) throw err
      res.pipe(process.stdout) // `res` is a stream

      res.on('data', function (chunk) {
        debug({text: `Response received and HTTP communication ended for Message ID: ` + message.id});
      })
    }) */

    //Logs
    debug({text: `New Message: \nAuthor: ${message.author.username}\nGuild: ${message.guild.name}, ${message.guild.id}\nMessage ID: ${message.id} \nMessage Length: ${totalWords.length} \nChannel: ${message.channel.name}, ${message.channelId}`});

  },
}