const { debug } = require("../../../terminal/debug");
const { error } = require("../../../terminal/error");

async function fetchID(req, res, client) {

  let success_message = { code: "success" };
  let error_message = { code: "error" };
  let body = req.body
  let guildID = req.params.guildID;

  debug({ text: `ID Fetching Request Received for Guild ID: ${guildID}` });

  try {
    let channels = body[0].channels
    let users = body[0].users
    let newArray = ({ newChannels: [], newUsers: [] })
    let guild = client.guilds.cache.get(
      `${String(guildID)}`
    );
    
    channels.forEach(async channel => {
      try {
        let discordChannel = await client.channels.fetch(channel)
        console.log( `Adding:` + discordChannel.name)
        newArray.newChannels.push({ id: channel, name: `${discordChannel.name}` })
        debug({ text: `Added Succesfully Channel: ${channel}` });

      } catch (err) {
        debug({ text: `Failed to add Channel: ${channel}` });
      }

    });

    users.forEach(async user => {
      try {
        let discordUser = client.users.cache.get(user)
        newArray.newUsers.push({ id: user, name: discordUser.username })
        debug({ text: `Added Succesfully User: ${user}` });

      } catch (err) {
        debug({ text: `Failed to add User: ${user}` });

      }
    });


    
    await console.log(newArray)
    await res.send(newArray);
  } catch (err) {
    error({ text: `Failed to communicate with the Discord API. /fetchID${guildID}` });
    console.log(err)
    res.send(error_message);

  }
}

module.exports = { fetchID };
