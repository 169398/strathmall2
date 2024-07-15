import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";

export async function getShops(req: NextApiRequest, res: NextApiResponse) {
  try {
    const shops = await prisma.shop.findMany();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteShop(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    await prisma.shop.delete({ where: { id: String(id) } });
    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
