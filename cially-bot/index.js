// Package Imports
const { Client, Events, GatewayIntentBits } = require('discord.js');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

// Variable Imports
const token = process.env.TOKEN


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    
});

// Log in to Discord with your client's token
console.log(token)
client.login(token);