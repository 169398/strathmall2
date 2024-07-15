import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";

export async function getOrders(req: NextApiRequest, res: NextApiResponse) {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteOrder(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    await prisma.order.delete({ where: { id: String(id) } });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
