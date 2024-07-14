import Link from "next/link";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import UserAccountNav from "./UserAccountNav";
import NavItems from "./NavItems";

export default async function Navbar() {
  const session = await getServerAuthSession();

  // Prefetch any necessary data using tRPC
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="sticky inset-x-0 top-0 z-50 h-16 bg-white">
        <header className="relative bg-white">
          <MaxWidthWrapper>
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <div className="ml-4 flex lg:ml-0">
                  <Link href="/">
                    <Image
                      src="/logo.png"
                      alt="strathmall logo"
                      width={150}
                      height={150}
                      className="h-22 w-22"
                    />
                  </Link>
                </div>

                <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                  <NavItems />
                </div>

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    {!session && (
                      <>
                        <Link
                          href="/api/auth/signin"
                          className={buttonVariants({
                            variant: "ghost",
                          })}
                        >
                          Sign in
                        </Link>
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                        <Link
                          href="/sign-up"
                          className={buttonVariants({
                            variant: "ghost",
                          })}
                        >
                          Create account
                        </Link>
                      </>
                    )}

                    {session && (
                      <>
                        <UserAccountNav user={session.user} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </header>
      </div>
    </HydrateClient>
  );
}
