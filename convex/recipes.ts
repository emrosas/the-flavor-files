import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import schema from "./schema";
import { Doc } from "./_generated/dataModel";

export type RecipeWithImage = Doc<"recipes"> & {
  imageUrl: string | null;
};

export const getTopFeatured = query({
  handler: async (ctx) => {
    const recipes = await ctx.db
      .query("recipes")
      .filter((q) => q.eq(q.field("featured"), true))
      .take(3);

    const recipesWithImages: RecipeWithImage[] = await Promise.all(
      recipes.map(async (recipe) => {
        return {
          ...recipe,
          imageUrl: recipe.image
            ? await ctx.storage.getUrl(recipe.image)
            : null,
        };
      }),
    );

    return recipesWithImages;
  },
});

export const getTopPopular = query({
  handler: async (ctx) => {
    const recipes = await ctx.db.query("recipes").take(10);
    const recipesWithImages: RecipeWithImage[] = await Promise.all(
      recipes.map(async (recipe) => {
        return {
          ...recipe,
          imageUrl: recipe.image
            ? await ctx.storage.getUrl(recipe.image)
            : null,
        };
      }),
    );

    return recipesWithImages;
  },
});

export const getUserRecipes = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { data: null, error: "User not authenticated!" };
    }

    const recipes = await ctx.db
      .query("recipes")
      .withIndex("by_author", (q) => q.eq("author", userId))
      .collect();

    const recipesWithImages: RecipeWithImage[] = await Promise.all(
      recipes.map(async (recipe) => {
        return {
          ...recipe,
          imageUrl: recipe.image
            ? await ctx.storage.getUrl(recipe.image)
            : null,
        };
      }),
    );

    return { data: recipesWithImages, error: null };
  },
});

export const createRecipe = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    time: schema.tables.recipes.validator.fields.time,
    instructions: v.array(v.string()),
    ingredients: schema.tables.recipes.validator.fields.ingredients,
    image: v.id("_storage"),
  },
  handler: async (
    ctx,
    { title, description, time, instructions, ingredients, image },
  ) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { data: null, error: "User not authenticated!" };
    }
    const recipeId = await ctx.db.insert("recipes", {
      author: userId,
      title,
      description,
      time,
      ingredients,
      instructions,
      featured: false,
      image,
    });

    return { data: recipeId, error: null };
  },
});
