"use client";
// SVG Imports
import Logo from "@/assets/svg/logo.svg";
import Glasses from "@/assets/svg/glasses.svg";
import Heart from "@/assets/svg/heart.svg";
import Plus from "@/assets/svg/plus.svg";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-latte-2 border-b border-latte-4/50 flex justify-between items-center px-8 py-4 sticky top-0 h-24 z-40">
      <div className="flex items-center gap-6">
        <Link href="/" id="logo">
          <Logo />
        </Link>
        <div className="grid grid-cols-3 bg-latte-3 rounded-md">
          <Link
            className={`px-3 py-1 gap-1 font-medium flex items-center justify-center rounded-md transition ${pathname === "/" ? "bg-brand-1 text-latte-1" : "hover:bg-latte-4 text-latte-5"}`}
            href="/"
          >
            <Glasses />
            Browse
          </Link>
          <Link
            className={`px-3 py-1 gap-1 font-medium flex items-center justify-center rounded-md transition ${pathname === "/favorites" ? "bg-brand-1 text-latte-1" : "hover:bg-latte-4 text-latte-5"}`}
            href="/favorites"
          >
            <Heart />
            Favorites
          </Link>
          <Link
            className={`px-3 py-1 gap-1 font-medium flex items-center justify-center rounded-md transition ${pathname === "/create" ? "bg-brand-1 text-latte-1" : "hover:bg-latte-4 text-latte-5"}`}
            href="/create"
          >
            <Plus />
            Create
          </Link>
        </div>
      </div>
      <Authenticated>
        <SignOutButton />
      </Authenticated>
      <Unauthenticated>
        <Link
          href="/signin"
          className="bg-brand-1 hover:bg-brand-2 text-latte-1 rounded-md px-4 pt-[6px] pb-2 font-medium transition"
        >
          Sign in
        </Link>
      </Unauthenticated>
    </nav>
  );
}

function SignOutButton() {
  const user = useQuery(api.users.currentUser);
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <div>
      <span className="mr-3">
        Welcome back{user?.username && ", "}
        {user?.username}!
      </span>
      <button
        className="bg-brand-1 hover:bg-brand-3 text-latte-1 rounded-md px-4 pt-[6px] pb-2 font-medium transition cursor-pointer"
        onClick={() =>
          void signOut().then(() => {
            router.push("/signin");
          })
        }
      >
        Sign out
      </button>
    </div>
  );
}
