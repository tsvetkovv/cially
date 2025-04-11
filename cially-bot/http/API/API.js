const express = require("express");
const app = express();
const port = process.env.PORT;
const { debug } = require("../../terminal/debug");
const { error } = require("../../terminal/error");
const { syncGuild } = require('./functions/syncGuild')
const { messageCreate } = require('./functions/messageCreate')
const { inviteCreate } = require('./functions/inviteCreate')
const { guildMemberRemove } = require('./functions/guildMemberRemove')
const { guildMemberAdd } = require('./functions/guildMemberAdd')

const PocketBase = require("pocketbase/cjs");
const url = process.env.POCKETBASE_URL;
const pb = new PocketBase(url);

// Globally Disabled Auto Cancellation
pb.autoCancellation(false)

// FIXME fix res logging

const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


async function API(client) {
  app.get("/syncGuild/:guildID", (req, res) => {
    syncGuild(req, res, client);
  });
  
  app.post("/messageCreate/:guildID", (req, res) => {
    messageCreate(req, res, client);
  });
  
  app.post("/inviteCreate/:guildID", (req, res) => {
    inviteCreate(req, res, client);
  });
  
  app.post("/guildMemberAdd/:guildID", (req, res) => {
    guildMemberAdd(req, res, client);
  });
  
  app.post("/guildMemberRemove/:guildID", (req, res) => {
    guildMemberRemove(req, res, client);
  });
  
  app.listen(port, () => {
    console.log(`[SUCCESS] `.green + `The API is running on port: ${port}! \n`);
  });
}

module.exports = { API };
