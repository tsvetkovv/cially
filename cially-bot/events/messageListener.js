// Imports
const { Events } = require("discord.js");
const cfonts = require("cfonts");
const { debug } = require("../terminal/debug");
const { error } = require("../terminal/error");
const { sendPostRequest } = require("../http/postRequest");

// Event
module.exports = {
	name: Events.MessageCreate,
	once: false,
	execute(message) {
		if (!message.author.bot) {
			// Get the number of words per message
			const totalWords = message.content
				.trim()
				.split(/\s+/)
				.filter((word) => word.length > 0);

			//Logs
			debug({
				text: `New Message: \nAuthor: ${message.author.username}\nGuild: ${message.guild.name}, ${message.guild.id}\nMessage ID: ${message.id} \nMessage Length: ${totalWords.length} \nChannel: ${message.channel.name}, ${message.channelId}\nAttachments: ${message.attachments.toJson}`,
			});

			// HTTP
			let info = {
				guildID: message.guild.id,
				messageID: message.id,
				messageLength: totalWords.length,
				channelID: message.channelId,
				authorID: message.author.id,
			};
			sendPostRequest({
				data: info,
				guildId: message.guild.id,
				type: module.exports.name,
			});
		}
	},
};
