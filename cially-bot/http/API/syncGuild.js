const express = require("express");
const app = express();
const port = process.env.PORT;
const { debug } = require("../../terminal/debug");
const { error } = require("../../terminal/error");

const PocketBase = require("pocketbase/cjs");
const url = process.env.POCKETBASE_URL;
const pb = new PocketBase(url);
const guild_collection_name = process.env.GUILD_COLLECTION;

async function API(client) {
  app.get("/syncGuild/:guildID", (req, res) => {
    // TODO add ratelimits
    
    let success_message = { code: "success" }
    let error_message = { code: "error" }
    
    let guildID = req.params.guildID;

    debug({ text: `Syncronization Request Received for Guild ID: ${guildID}` });

    try {
      async function fetchGuilds() {
        const guilds = await pb.collection(guild_collection_name).getFullList({
          filter: `discordID ?= '${guildID}'`,
        });

        if (guilds.length > 0) {
          guilds.forEach((guild) => {
            // Check to see if the bot is in the guild
            if (guild.discordID) {
              async function setNewData() {
                let Guild = client.guilds.cache.get(
                  `${String(guild.discordID)}`
                );
                let channels = Guild.channels.cache.size;
                let roles = Guild.roles.cache.size;
                let bans = Guild.bans.cache.size;
                let owner = await Guild.fetchOwner();
                let icon_url = await Guild.iconURL
                console.log(icon_url)

                debug({ text: `Syncing Guild: ${Guild.name}, ${Guild.id}` });
                const newData = {
                  name: Guild.name,
                  members: Guild.memberCount,
                  available: Guild.available,
                  discord_partner: Guild.partnered,
                  channels: channels,
                  roles: roles,
                  bans: bans,
                  creation_date: Guild.createdAt,
                  owner_username: owner.user.username,
                  icon_url: icon_url
                };
                const updatedRecord = await pb
                  .collection("guilds")
                  .update(`${guild.id}`, newData);
                debug({ text: `Guild got synced: ${Guild.name}, ${Guild.id}` });
              }
              try {
                setNewData();
                res.send(success_message);
              } catch (err) {
                error({
                  text: `Failed to sync data for GuildID: ${Guild.id}\n${error}`,
                });
                res.send(error_message);
              }
            }
          });
        } else {
          debug({
            text: `Failed to fetch guild with ID: ${guildID}`,
          });
          res.send(error_message);
        }
      }
      fetchGuilds();
    } catch (err) {
      console.log(err);
      error({ text: `Failed to communicate with the Database` });
      res.send(error_message);
    }
  });

  app.listen(port, () => {
    console.log(`[SUCCESS] `.green + `The API is running on port: ${port}! \n`);
  });
}

module.exports = { API };
