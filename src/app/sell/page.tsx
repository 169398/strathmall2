import { Card } from "~/components/ui/card";

import { SellForm } from "../components/form/Sellform";
import { getServerAuthSession } from "~/server/api/routers/auth";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "~/lib/prisma";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
   
  });

  if (!data) {
    throw new Error("User not found");
  }
}

export default async function SellRoute() {
  noStore();
  const { getUser } = getServerActionSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  const data = await getData(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
}
