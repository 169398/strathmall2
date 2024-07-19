// src/server/api/context.ts
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { prisma } from "~/lib/prisma";
import { authOptions } from "./auth";

export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerSession(opts.req, opts.res, authOptions);

  return {
    session,
    db: prisma,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
