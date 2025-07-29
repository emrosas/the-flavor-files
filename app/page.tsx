"use client";

import Navbar from "@/components/Navbar";
import { RecipeCard, FeaturedRecipeCard } from "@/components/RecipeCard";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const featuredRecipes = useQuery(api.recipes.getTopFeatured);
  const popularRecipes = useQuery(api.recipes.getTopPopular);

  return (
    <main>
      <Navbar />
      <div className="px-8 gap-8 grid grid-cols-[1fr_3fr]">
        <div>
          <div className="pt-8 sticky top-24">
            <div className="px-4 py-3 bg-latte-3 rounded-2xl">
              <h1 className="text-xl font-serif font-semibold">
                Welcome to The Flavor Files
              </h1>
              <p className="text-xs">
                Soon you will be able to explore and share your favorite
                recipes.
              </p>
            </div>
          </div>
        </div>
        <div className="py-8">
          {featuredRecipes && featuredRecipes.length > 0 && (
            <>
              <h2 className="capitalize font-serif font-semibold text-3xl mb-6">
                Recipes of the week
              </h2>
              <ul className="grid grid-cols-3 gap-4 mb-8">
                {featuredRecipes.map((recipe) => (
                  <FeaturedRecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </ul>
            </>
          )}
          {popularRecipes && popularRecipes.length > 0 && (
            <>
              <h2 className="capitalize font-serif font-semibold text-3xl mb-6">
                Popular Recipes
              </h2>
              <ul className="grid grid-cols-2 gap-4">
                {popularRecipes.map((recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
