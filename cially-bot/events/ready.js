const { Events } = require("discord.js");
const cfonts = require("cfonts");
const { debug } = require('../terminal/debug');
const { error } = require('../terminal/error');


module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    
    cfonts.say("CIALLY BOT", {
      font: "block", 
      align: "left", // define text alignment
      colors: ["blue"], // define all colors
      background: "transparent", // define the background color, you can also use `backgroundColor` here as key
      letterSpacing: 1, // define letter spacing
      lineHeight: 1, // define the line height
      space: true, // define if the output text should have empty lines on top and on the bottom 
      env: "node",
    });

    debug({text: `Client Found: ${client.user.tag}`});
    console.log(`[SUCCESS] `.green + `The Bot is Running! \n\n-----------LOGS------------\n\n`);
  },
};
