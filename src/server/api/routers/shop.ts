// src/server/api/routers/shop.ts
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "~/server/prisma";

export const shopRouter = router({
  createShop: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        whatsappNumber: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const shop = await prisma.shop.create({
        data: {
          name: input.name,
          email: input.email,
          whatsappNumber: input.whatsappNumber,
        },
      });
      return shop;
    }),
});
