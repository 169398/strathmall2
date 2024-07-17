import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { shopname, whatsapp, category, description, images }: {
      shopname: string,
      whatsapp: string,
      category: string,
      description: string,
      images: string[]
    } = req.body as {
      shopname: string,
      whatsapp: string,
      category: string,
      description: string,
      images: string[]
    };

    // Ensure the shop name is unique
    const existingShop = await prisma.shop.findUnique({
      where: { id: shopname },
    });

    if (existingShop) {
      return res.status(400).json({ message: "Shop name already exists" });
    }

    // Create the shop
    const newShop = await prisma.shop.create({
      data: {
        name: shopname,
        whatsapp,
        category,
        description,
        images,
        Email: "", 
        owner: { create: { name: "" } },
      },
    });

    return res.status(201).json(newShop);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
