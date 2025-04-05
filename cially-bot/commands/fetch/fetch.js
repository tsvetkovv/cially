// Template

const { SlashCommandBuilder } = require("discord.js")
const { updatePendingGuilds } = require('../../functions/fetchScheduler')
const { debug } = require('../../terminal/debug');
const { error } = require('../../terminal/error');

const PocketBase = require('pocketbase/cjs')
const url = process.env.POCKETBASE_URL
const pb = new PocketBase(url);
const guild_collection_name = "guilds"


module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch')
		.setDescription('command description'),
	async execute(interaction) {


        //updatePendingGuilds();

        debug({ text: `Searching for fetch requests...` });
    try {
      const guilds = await pb.collection(guild_collection_name).getFullList({
        filter: "pending_fetch ?= true",
      });
      

      if (guilds.length > 0) {
        guilds.forEach(guild => {
            console.log(guild.discordID)
            console.log(interaction.client.guilds.cache.get(`${String(x)}`))
        });
      }
    } catch (err) {
      console.log(err)
    }

    debug({ text: `Fetch Request Scanning Complete` });
        

        await interaction.reply('Done');
	},
};