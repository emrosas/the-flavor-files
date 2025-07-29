"use client";

import Navbar from "@/components/Navbar";
import { RecipeCard } from "@/components/RecipeCard";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Favorites() {
  const userRecipes = useQuery(api.recipes.getUserRecipes);

  return (
    <main>
      <Navbar />
      <div className="px-8 py-8">
        <div className="flex -mb-[2px]">
          <h1 className="capitalize font-serif text-2xl font-semibold bg-latte-3 px-4 py-2 rounded-t-xl">
            Your Recipes
          </h1>
          <div className="capitalize flex flex-col bg-latte-3 px-4 py-2 rounded-t-xl cursor-not-allowed opacity-50">
            <h2 className="font-serif font-semibold text-xl">Your Favorites</h2>
            <span className="text-[8px] font-sans">Coming Soon</span>
          </div>
        </div>
        <div className="p-4 pt-6 bg-latte-3 rounded-b-xl rounded-tr-xl">
          {userRecipes?.data ? (
            <ul className="grid grid-cols-3 gap-6">
              {userRecipes.data.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </ul>
          ) : (
            <p>You have no recipes saved.</p>
          )}
        </div>
      </div>
    </main>
  );
}
