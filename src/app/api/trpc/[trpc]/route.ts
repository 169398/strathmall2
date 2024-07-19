

// src/pages/api/trpc/[trpc].ts
import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "~/server/api/routers/index";
import { createContext } from "~/server/api/trpc";

export const Get = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
export const  Post = trpcNext.createNextApiHandler({
   router: appRouter, createContext
   });