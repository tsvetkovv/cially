export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {

    

    let response = [{errorcode: "404"}]
    return Response.json({ response });

  }