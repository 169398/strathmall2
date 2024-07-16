



"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

type User = {
  email: string;
  hasShop: boolean;
  role: string;
};

const UserAccountNav = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
      <Button variant="ghost" size="sm" className="relative">
        My account
      </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 bg-white" align="end">
      <div className="flex items-center justify-start gap-2 p-2">
        <div className="flex flex-col space-y-0.5 leading-none">
        <p className="text-sm font-medium text-black">{user.email}</p>
        </div>
      </div>

      <DropdownMenuSeparator />

      {user.hasShop && (
        <DropdownMenuItem asChild className="cursor-pointer">
        <Link href="/sell">Seller Dashboard</Link>
        </DropdownMenuItem>
      )}

      {user.role === "admin" && (
        <DropdownMenuItem asChild  className="cursor-pointer">
        <Link href="/admin">Admin Dashboard</Link>
        </DropdownMenuItem>
      )}

      {!user.hasShop && (
        <DropdownMenuItem asChild   className="cursor-pointer">
        <Link href="/create-shop">Create a Shop</Link>
        </DropdownMenuItem>
      )}

      <Link href="/api/auth/signout">
        <DropdownMenuItem className="cursor-pointer">
        Log out
        </DropdownMenuItem>
      </Link>
      </DropdownMenuContent>
    </DropdownMenu>
    );
};

export default UserAccountNav;


