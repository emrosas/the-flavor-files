"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  return (
    <main className="h-screen grid grid-cols-2">
      <div className="flex flex-col px-8 py-6 justify-center gap-8">
        <div>
          <Link
            href="/"
            id="logo"
            className="font-bold font-serif text-4xl block mb-2"
          >
            The Flavor Files
          </Link>
          <p>
            Never lose a recipe again. Explore popular creations, Save your
            favorites for later and Share your own for the world to enjoy.
          </p>
        </div>
        <SignInForm />
      </div>
      <div className="bg-brand-1" />
    </main>
  );
}

function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.set("flow", flow);
    console.log(formData);
    void signIn("password", formData)
      .then((response) => {
        if (response && response.signingIn) {
          if (response.redirect) {
            router.push(response.redirect.toString());
          }
        } else {
          router.push("/");
        }
      })
      .catch(() => {
        setError("Could not sign in.");
      });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      {flow === "signUp" && (
        <input
          className="bg-background text-foreground rounded-md p-2 border-2 border-slate-200 dark:border-slate-800"
          type="text"
          name="username"
          placeholder="Username"
        />
      )}
      <input
        className="bg-background text-foreground rounded-md p-2 border-2 border-slate-200 dark:border-slate-800"
        type="email"
        name="email"
        placeholder="Email"
      />
      <input
        className="bg-background text-foreground rounded-md p-2 border-2 border-slate-200 dark:border-slate-800"
        type="password"
        name="password"
        placeholder="Password"
      />
      <button
        className="bg-brand-1 hover:bg-brand-2 text-latte-1 rounded-md px-4 pt-[6px] pb-2 font-medium cursor-pointer transition"
        type="submit"
      >
        {flow === "signIn" ? "Sign in" : "Sign up"}
      </button>
      <div className="flex flex-row gap-2">
        <span>
          {flow === "signIn"
            ? "Don't have an account?"
            : "Already have an account?"}
        </span>
        <span
          className="text-foreground underline hover:no-underline cursor-pointer"
          onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
        >
          {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
        </span>
      </div>
      {error && (
        <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
          <p className="text-foreground font-mono text-xs">
            Error signing in: {error}
          </p>
        </div>
      )}
    </form>
  );
}
