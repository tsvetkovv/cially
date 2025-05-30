// Imports
const { debug } = require("../terminal/debug");
const { error } = require("../terminal/error");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const get = require("simple-get");

// API URL Initialization
const API_URL = process.env.API_URL;

// Main Event
function sendPostRequest({ data, guildId, type }) {
	try {
		// Send a debug message on attempt
		debug({ text: `HTTP Request sent` });

		// Load request options through event parameters
		const opts = {
			url: `${API_URL}/${type}/${guildId}/`,
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		// HTTP Request
		get.post(opts, (err, res) => {
			try {
				res.pipe(process.stdout);

				// Wait for API Response
				res.on("data", (chunk) => {
					debug({ text: `Response received and HTTP communication ended` });
				});
			} catch (err) {
				if (
					String(err.message).includes(
						`Cannot read properties of undefined (reading 'pipe')`,
					)
				) {
					error({
						text:
							`Looks like the bot can't communicate with ` +
							opts.url.blue +
							`\n  Check that you provided the correct URL and that the API is online and accessible.`,
					});
				} else {
					error({
						text: `Something went wrong while trying to communicate with the API: \n${err}`,
					});
				}
			}
		});
	} catch (err) {
		// Yes, it needs 2 error handlers from some reason..
		error({
			text: `Something went wrong while trying to communicate with the API: \n${err}`,
		});
	}
}

// Export Event
module.exports = { sendPostRequest };
