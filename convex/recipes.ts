import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getTopFeatured = query({
  handler: async (ctx) => {
    return ctx.db
      .query("recipes")
      .filter((q) => q.eq(q.field("featured"), true))
      .take(3);
  },
});

export const getTopPopular = query({
  handler: async (ctx) => {
    return ctx.db.query("recipes").take(10);
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
    return { data: recipes, error: null };
  },
});

export const createRecipe = mutation({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, { title, description }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { data: null, error: "User not authenticated!" };
    }
    const recipeId = await ctx.db.insert("recipes", {
      author: userId,
      title,
      description,
      time: "10-15 min",
      ingredients: [],
      instructions: [],
      featured: false,
    });

    return { data: recipeId, error: null };
  },
});
