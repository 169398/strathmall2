
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";
import { httpBatchLink } from "@trpc/client";
import { type AppRouter } from "~/server/api/root";

// Create TRPC React hooks
export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
        url: "/api/trpc",
        transformer: superjson,
    }),
  ],
});
