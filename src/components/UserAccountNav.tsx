



"use client";

// import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";

type User = {
  image: null;
  email: string;
  hasshops: boolean;
  role: string;
  name: string;
};

const UserAccountNav = ({ user }: { user: User }) => {




  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            user={{
              name: user.name || null,
              image: user.image ?? "https://avatar.vercel.sh/${use.name}?size=30",
            }}
            className="h-8 w-8"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-60 bg-white" align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {user.name && <p className="font-medium">{user.name}</p>}
              {user.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user.email}k
                </p>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          {user.hasshops && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/sell">Seller Dashboard</Link>
            </DropdownMenuItem>
          )}

          {user.role === "ADMIN" && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin">Admin Dashboard</Link>
            </DropdownMenuItem>
          )}

          {!user.hasshops && (
            <DropdownMenuItem
              asChild
              className="cursor-pointer"
              // onClick={() => setShowOnboarding(true)}
            >
              <Link href="/create-shop">Create a Shop</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>

          <Link href="/api/auth/signout">
            <DropdownMenuItem className="cursor-pointer">
              Log out
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 
      {showOnboarding && (
        <ShopOnboarding onClose={() => setShowOnboarding(false)} />
      )} */}
    </>
  );
};

export default UserAccountNav;


