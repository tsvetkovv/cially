const { debug } = require("../../../terminal/debug");
const { error } = require("../../../terminal/error");

const PocketBase = require("pocketbase/cjs");
const url = process.env.POCKETBASE_URL;
const pb = new PocketBase(url);
const guild_collection_name = process.env.GUILD_COLLECTION;
let collection_name = process.env.MESSAGE_COLLECTION;
const { registerGuild } = require("./logic/registerGuild");

async function messageCreate(req, res, client) {
  let body = req.body;
  const { guildID, messageID, messageLength, channelID, authorID } = body;

  debug({ text: `New POST req: \n${JSON.stringify(body)}` });

  // res to the req. Be kind and don't leave my boy Discord Bot on seen :)
  const roger = {
    res: `Message Received with the following details: GI: ${guildID}, MI: ${messageID}`,
  };

  // Database Logic
  try {
    const guild = await pb
      .collection(guild_collection_name)
      .getFirstListItem(`discordID='${guildID}'`, {});
    debug({ text: `Guild has been found and is ready to add data to it` });

    // FIXME Multiple messages dont get tracked

    try {
      const itemData = {
        author: authorID,
        guildID: guild.id,
        channelID: channelID,
        messageLength: messageLength,
      };
      const newMessage = await pb.collection(collection_name).create(itemData);
      debug({
        text: `Message has been added in the database. ID: ${messageID}`,
      });
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    // 404 error -> guild is not on the database. Attempt to add it
    if (err.status == 404) {
      registerGuild(guildID);
    } else {
      debug({ text: `Failed to communicate with the Database: \n${err}` });

      error({ text: `[ERROR] Error Code: ${err.status}` });
    }
  }

  debug({
    text: `End of logic. Stopping the communication and returning a res to the Bot`,
  });

  // Express response
  return res.status(201).json(roger);
}

module.exports = { messageCreate };
