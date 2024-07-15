import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import * as usersHandler from "./handlers/users";
import * as shopsHandler from "./handlers/shops";
import * as ordersHandler from "./handlers/orders";
import * as productsHandler from "./handlers/products";

const handlers = {
  users: usersHandler,
  shops: shopsHandler,
  orders: ordersHandler,
  products: productsHandler,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { resource } = req.query;
  const resourceHandler = handlers[resource as string];

  if (!resourceHandler) {
    return res.status(400).json({ error: "Invalid resource" });
  }

  switch (req.method) {
    case "GET":
      return resourceHandler.getUsers
        ? resourceHandler.getUsers(req, res)
        : res.status(405).json({ error: "Method Not Allowed" });
    case "DELETE":
      return resourceHandler.deleteUser
        ? resourceHandler.deleteUser(req, res)
        : res.status(405).json({ error: "Method Not Allowed" });
    default:
      return res.status(405).json({ error: "Method Not Allowed" });
  }
}
