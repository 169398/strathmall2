import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { cn, constructMetadata } from "~/lib/utils";
import Footer from "~/components/Footer";
import { Toaster } from "sonner";
import Navbar from "~/components/Navbar";

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
        <main>
          <TRPCReactProvider>
            <Navbar />

            <div flex-grow flex-1>
              {children}
            </div>

            <Footer />
          </TRPCReactProvider>
          <Toaster position="top-center" richColors />
        </main>
      </body>
    </html>
  );
}
