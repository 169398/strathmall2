import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { cn, constructMetadata } from "~/lib/utils";
import { Toaster } from "sonner";
import Navbar from "~/components/Navbar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "~/app/api/uploadthing/core";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = constructMetadata();
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <main>
          <TRPCReactProvider>
            <Navbar />

            <div flex-grow flex-1>
              {children}
            </div>
          </TRPCReactProvider>
          <Toaster position="top-center" richColors />
        </main>
      </body>
    </html>
  );
}
