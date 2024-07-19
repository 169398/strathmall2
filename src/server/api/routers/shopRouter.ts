// import { z } from "zod";
// import {
//   createTRPCRouter,
//   publicProcedure,
//   protectedProcedure,
// } from "~/server/api/trpc";
// import { PrismaClient } from "@prisma/client";

// export const shopRouter = createTRPCRouter({
//   // CREATE SHOP - Protected (only logged-in users)
//   create: protectedProcedure
//       .input(
//         z.object({
//           name: z.string().min(3, "Shop name must be at least 3 characters"),
//           description: z.string(),
//           phoneNumber: z.string().regex(/^\+254\d{9}$/, "Invalid phone number"),
//           category: z.array(z.string()),
//           imageUrl: z.string().url(),
//           ownerEmail: z.string(),
          
//         }),
//       )
//       .mutation(async ({ ctx, input }) => {
//         const prisma = new PrismaClient();
  
//         try {
//           const shop = await prisma.shop.create({
//             data: {
//               name: input.name,
//               description: input.description,
//               phoneNumber: input.phoneNumber,
//               category: { set: input.category },
//               imageUrl: input.imageUrl,
//               ownerEmail: input.ownerEmail,
//               ownerId: ctx.session.user.id,
//             },
//           });
  
//           return shop;
//         } finally {
//           await prisma.$disconnect();
//         }
//       }),

//   // GET ALL SHOPS - Public
//   getAll: publicProcedure.query(async ({ ctx }) => {
//     const prisma = new PrismaClient();

//     try {
//       const shops = await prisma.shop.findMany({
//         include: { products: true },
//       });

//       return shops;
//     } finally {
//       await prisma.$disconnect();
//     }
//   }),

//   // GET SHOP BY ID - Public
//   getById: publicProcedure
//     .input(z.object({ id: z.string() }))
//     .query(async ({ ctx, input }) => {
//       const prisma = new PrismaClient();

//       try {
//         const shop = await prisma.shop.findUnique({
//           where: { id: input.id },
//           include: { products: true }, // Eager load products
//         });

//         if (!shop) {
//           throw new Error("Shop not found");
//         }

//         return shop;
//       } finally {
//         await prisma.$disconnect();
//       }
//     }),
// });


import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

export const shopRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3, "Shop name must be at least 3 characters"),
        description: z.string(),
        phoneNumber: z.string().regex(/^\+254\d{9}$/, "Invalid phone number"),
        categories: z.array(z.string()),
        imageUrl: z.string().url(),
        ownerEmail: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const prisma = new PrismaClient();
      const shop = await prisma.shop.create({
        data: {
          ...input,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          ownerId: ctx.session.user.id,
          name: input.name,
          description: input.description,
          phoneNumber: input.phoneNumber,
          category: { set: input.categories },
          imageUrl: input.imageUrl,
          ownerEmail: input.ownerEmail,
        },
      });
      await prisma.$disconnect();
      return shop;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const prisma = new PrismaClient();
    const shops = await prisma.shop.findMany({
      include: { products: true },
    });
    await prisma.$disconnect();
    return shops;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const prisma = new PrismaClient();
      const shop = await prisma.shop.findUnique({
        where: { id: input.id },
        include: { products: true },
      });
      await prisma.$disconnect();
      if (!shop) throw new Error("Shop not found");
      return shop;
    }),
});
