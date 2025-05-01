// Imports
const PocketBase = require("pocketbase/cjs");

// Initialize Pocketbase URL
const url = process.env.POCKETBASE_URL;

// Pocketbase Initialization
const pb = new PocketBase(url);
let guild_data_collection_name = process.env.GENERAL_DATA_GUILD_COLLECTION;
const get = require("simple-get");
const { debug } = require("../../../../terminal/debug");
const { error } = require("../../../../terminal/error");
const API_URL = process.env.API_URL;

async function registerGuildData(guildID) {
	debug({ text: `Guild General Data is not in the database. Attempting to add it...` });

	const guildData = { guildID: guildID,  };
	
	try {
		console.log(guild_data_collection_name)
		const newGuild = await pb
			.collection(guild_data_collection_name)
			.create(guildData);
		debug({ text: `Guild General Data has been added to the database` });
		
	} catch (error) {
		debug({ text: `Failed to create new guild: \n${error}` });
	}
}

module.exports = { registerGuildData };
