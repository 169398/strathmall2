"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";

const MyShopPage = () => {
  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">My Shop</h1>
      <Link href="/my-shop/add-product">
        <Button className="w-full">Add New Product</Button>
      </Link>
    </div>
  );
};

export default MyShopPage;
