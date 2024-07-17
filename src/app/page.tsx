"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import Footer from "~/components/Footer";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description: " Get your products right away in your email",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description: " Get quality verified products ",
  },
  {
    name: "For the planet",
    Icon: Leaf,
    description:
      " We've pledged 1% of sales to the preservation of the natural environment ",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
          <h1 className="tranking-tight text-4xl font-bold text-gray-950 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-blue-700">products</span>.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Welcome to StrathMall.Every product on this platform is verified by
            our team to ensure our highest quality standards.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/products " className={buttonVariants()}>
              Browse Trending
            </Link>

            <Button variant="ghost">our quality Products &rarr;</Button>
          </div>
        </div>
        {/* <ProductReel
          query={{ sort: "desc", limit: 4 }}
          href="/products?sort=recent"
          title="Brand new"
        /> */}
      </MaxWidthWrapper>

      <section className="border-grray-200 border-t bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="lg-gap-y-0 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-accent-foreground"
              >
                <div className="flex justify-center md:flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full text-blue-400">
                    {<perk.Icon className="h-1/3 w-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
        <Footer />
      </section>
    </>
  );
}
