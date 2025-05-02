import { describe } from "node:test";
import PocketBase from "pocketbase";

// Pocketbase Initialization
const url = process.env.POCKETBASE_URL;
const pb = new PocketBase(url);

let guild_collection_name = process.env.GUILDS_COLLECTION;
let message_collection_name = process.env.MESSAGE_COLLECTION;

// Main GET Event
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  async function deleteAllFromCollection(collectionName: string) {
    const records = await pb.collection(collectionName).getFullList(); // loads all records
    await Promise.all(
      records.map(record => pb.collection(collectionName).delete(record.id))
    );
  }

  try {
    // Deletes data in the "guilds" collection so all the data loses their guild relation
    // Saves time & data instead of clearing every single collection
    await deleteAllFromCollection('guilds');
    return Response.json({ code: "Success" });
  } catch (err) {
    return Response.json({ code: "Error" });

  }
}