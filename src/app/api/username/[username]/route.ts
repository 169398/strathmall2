import { db } from "~/server/db";
import { UsernameValidator } from "~/lib/validators/username";
import { z } from "zod";
import { getServerAuthSession } from "~/server/api/routers/auth";

export async function PATCH(req: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await req.json();
    const { name } = UsernameValidator.parse(body);

    // check if username is taken
    const username = await db.user.findFirst({
      where: {
        name: name,
      },
    });

    if (username) {
      return new Response("Username is taken", { status: 409 });
    }

    // update username
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name,
      },
    });

    return new Response("OK");
  } catch (error) {
    error;

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not update username at this time. Please try later",
      { status: 500 },
    );
  }
}
