// Imports
const { Events } = require("discord.js");
const cfonts = require("cfonts");
const { debug } = require('../terminal/debug');
const { error } = require('../terminal/error');

// Main Event
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {

    // Cool Console Title :P (serves no point at all)
    cfonts.say("CIALLY", {
      font: "block", 
      align: "center", // define text alignment
      colors: ["blue"], // define all colors
      background: "transparent", // define the background color, you can also use `backgroundColor` here as key
      letterSpacing: 1, // define letter spacing
      lineHeight: 1, // define the line height
      space: true, // define if the output text should have empty lines on top and on the bottom 
      env: "node",
    });

    // Logs
    debug({text: `Client Found: ${client.user.tag}`});
    console.log(`[SUCCESS] `.green + `The Bot is Running! \n\n-----------LOGS------------\n\n`);
  },
};
