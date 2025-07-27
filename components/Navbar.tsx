"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <nav className="bg-latte-2 border-b border-latte-4/50 flex justify-between items-center px-8 py-4">
      <div className="flex items-center gap-6">
        <Link href="/" id="logo" className="font-bold font-serif text-2xl">
          The Flavor Files
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Browse</Link>
          </li>
          <li>
            <Link href="/favorites">Favorites</Link>
          </li>
          <li>
            <Link href="/create">Create</Link>
          </li>
        </ul>
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
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
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
  );
}
