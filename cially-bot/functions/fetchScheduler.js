const PocketBase = require('pocketbase/cjs')
const url = process.env.POCKETBASE_URL
const pb = new PocketBase(url);
const { debug } = require('.././terminal/debug');
const { error } = require('.././terminal/error');
const guild_collection_name = "guilds"

async function updatePendingGuilds() {
    // if (fetch_status == true) {

    debug({ text: `Searching for fetch requests...` });
    try {
      const guilds = await pb.collection(guild_collection_name).getFullList({
        filter: "pending_fetch ?= true",
      });
      

      if (guilds.length > 0) {
        guilds.forEach(guild => {
            console.log(client.guilds.cache.get(guild.id).members())
        });
      }
    } catch (err) {
      console.log(err)
    }

    debug({ text: `Fetch Request Scanning Complete` });
}

module.exports = { updatePendingGuilds };
