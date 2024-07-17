


// import { z } from "zod";
// import {
//   createTRPCRouter,
//   protectedProcedure,
//   publicProcedure,
// } from "~/server/api/trpc";
// import { PrismaClient } from "@prisma/client";

// export const productRouter = createTRPCRouter({
//   // ADD PRODUCT TO SHOP - Protected (shop owner)
//   add: protectedProcedure
//     .input(
//       z.object({
//         shopId: z.string(),
//         name: z.string().min(3, "Product name must be at least 3 characters"),
//         description: z.string(),
//         price: z.number().min(0),
//         discount: z.string().optional(),
//         category: z.array(z.string()),
//         images: z.array(z.string()), // URLs from Uploadthing
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const prisma = new PrismaClient();

//       try {
//         // Check if the current user is the owner of the shop
//         const shop = await prisma.shop.findUnique({
//           where: { id: input.shopId },
//         });
//         if (!shop || shop.ownerId !== ctx.session.user.id) {
//           throw new Error(
//             "You don't have permission to add products to this shop",
//           );
//         }

//         // Create the product in the database
//         const product = await prisma.product.create({
//           data: {
//             name: input.name,
//             description: input.description,
//             price: input.price,
//             discount: input.discount,
//             category: { set: input.category },
//             images: { set: input.images }, // Save the images URLs
//             shop: { connect: { id: input.shopId } },
//             user: { connect: { id: ctx.session.user.id } },
//             inStock: true, // Default to true for new products
//           },
//         });
//         console.log(product)

//         return product;
//       } finally {
//         await prisma.$disconnect(); // Disconnect Prisma client
//       }
//     }),

//   // UPDATE PRODUCT - Protected (shop owner)
//   update: protectedProcedure
//     .input(
//       z.object({
//         productId: z.string(),
//         name: z.string().min(3, "Product name must be at least 3 characters"),
//         description: z.string(),
//         price: z.number().min(0),
//         discount: z.string().optional(),
//         category: z.array(z.string()),
//         images: z.array(z.string()), // URLs from Uploadthing
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const prisma = new PrismaClient();

//       try {
//         // Check if the current user is the owner of the product's shop
//         const product = await prisma.product.findUnique({
//           where: { id: input.productId },
//           include: { shop: true },
//         });
//         if (!product || product.shop.ownerId !== ctx.session.user.id) {
//           throw new Error("You don't have permission to update this product");
//         }

//         // Update the product in the database
//         const updatedProduct = await prisma.product.update({
//           where: { id: input.productId },
//           data: {
//             name: input.name,
//             description: input.description,
//             price: input.price,
//             discount: input.discount,
//             category: { set: input.category },
//             images: { set: input.images }, // Save the updated images URLs
//           },
//         });
// console.log(updatedProduct)
//         return updatedProduct;
//       } finally {
//         await prisma.$disconnect(); // Disconnect Prisma client
//       }
//     }),

//   // DELETE PRODUCT - Protected (shop owner)
//   delete: protectedProcedure
//     .input(
//       z.object({
//         productId: z.string(),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const prisma = new PrismaClient();

//       try {
//         // Check if the current user is the owner of the product's shop
//         const product = await prisma.product.findUnique({
//           where: { id: input.productId },
//           include: { shop: true },
//         });
//         if (!product || product.shop.ownerId !== ctx.session.user.id) {
//           throw new Error("You don't have permission to delete this product");
//         }

//         // Delete the product from the database
//         await prisma.product.delete({
//           where: { id: input.productId },
//         });

//         return true; // Successful deletion
//       } finally {
//         await prisma.$disconnect(); // Disconnect Prisma client
//       }
//     }),

//   // GET PRODUCTS BY SHOP ID - Public
//   getByShopId: publicProcedure
//     .input(z.object({ shopId: z.string() }))
//     .query(async ({ ctx, input }) => {
//       const prisma = new PrismaClient();

//       try {
//         // Retrieve products for the specified shop ID
//         const products = await prisma.product.findMany({
//           where: { shopId: input.shopId },
//         });

//         return products;
//       } finally {
//         await prisma.$disconnect(); // Disconnect Prisma client
//       }
//     }),
// });


import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";
import { prisma } from "~/lib/prisma";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Product name is required"),
        description: z.string(),
        price: z.number().positive(),
        inStock: z.boolean(),
        discount: z.string().optional(),
        categoryId: z.string(),
        imageUrl: z.string().url(),
        shopId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const prisma = new PrismaClient(); 
      const product = await prisma.product.create({
        data: {
          ...input,
        },
      });
      return product;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().positive().optional(),
        inStock: z.boolean().optional(),
        discount: z.string().optional(),
        categoryId: z.string().optional(),
        imageUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const prisma = new PrismaClient();
      const product = await prisma.product.update({
        where: { id: input.id },
        data: { ...input },
      });
      return product;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await prisma.product.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),

  getByShopId: protectedProcedure
    .input(z.object({ shopId: z.string() }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.product.findMany({
        where: { shopId: input.shopId },
      });
      return products;
    }),
});
