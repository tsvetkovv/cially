import PocketBase from "pocketbase";
const url = process.env.POCKETBASE_URL;

export async function POST(request: Request) {
  const pb = new PocketBase(url);
  // Parse the request body
  const body = await request.json();
  const { guildId, messageId } = body;

  console.log(body);

  // e.g. Insert new user into your DB
  const roger = {
    response: `Message Received with the following details: GI: ${guildId}, MI: ${messageId}`,
  };

  try {
    const record = await pb.collection("guilds").getOne(guildId, {});

    console.log('Guild has been found and is ready to add data to it')

} catch (error) {
    console.log('Guild is not in the database. Attempting to add it')
    console.log(error.status)
  } 
  // fetch a paginated records list

  return new Response(JSON.stringify(roger), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
