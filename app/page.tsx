"use client";

import Navbar from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";

export default function Home() {
  const featuredRecipes = useQuery(api.recipes.getTopFeatured);

  return (
    <main>
      <Navbar />
      <div className="px-8 py-8 gap-8 grid grid-cols-[1fr_3fr]">
        <div>
          <div className="px-4 py-3 bg-latte-3 rounded-md">
            <h1 className="text-xl">Welcome to The Flavor Files</h1>
            <p>
              Soon you will be able to explore and share your favorite recipes.
            </p>
          </div>
        </div>
        <div>
          <h2 className="capitalize font-serif font-semibold text-3xl mb-6">
            Recipes of the week
          </h2>
          <ul className="grid grid-cols-3 gap-4">
            {featuredRecipes &&
              featuredRecipes.map((recipe) => (
                <FeaturedCard key={recipe._id} recipe={recipe} />
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

function FeaturedCard({ recipe }: { recipe: Doc<"recipes"> }) {
  return (
    <li className="p-4 rounded-md bg-latte-1">
      <div className="w-full aspect-video bg-brand-1 rounded-sm mb-3" />
      <h4 className="font-medium">{recipe.title}</h4>
      <p className="text-xs">{recipe.description}</p>
    </li>
  );
}
