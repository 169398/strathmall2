// src/server/routers/_app.ts
import { router } from "~/server/api/trpc";
import { shopRouter } from "./shop";

export const appRouter = router({
  shop: shopRouter,
});

export type AppRouter = typeof appRouter;
