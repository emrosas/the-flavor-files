import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import schema from "./schema";

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
    time: schema.tables.recipes.validator.fields.time,
    instructions: v.array(v.string()),
  },
  handler: async (ctx, { title, description, time, instructions }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { data: null, error: "User not authenticated!" };
    }
    const recipeId = await ctx.db.insert("recipes", {
      author: userId,
      title,
      description,
      time,
      ingredients: [],
      instructions,
      featured: false,
    });

    return { data: recipeId, error: null };
  },
});
