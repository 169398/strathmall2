import { initTRPC } from "@trpc/server";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";

const prisma = new PrismaClient();

const t = initTRPC.context().create();

export const createContext = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const session = await getSession({ req });
  return { req, res, prisma, session };
};

export const router = t.router;
export const publicProcedure = t.procedure;

export { prisma };
