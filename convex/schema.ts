import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  recipes: defineTable({
    title: v.string(),
    description: v.string(),
    ingredients: v.array(v.string()),
    instructions: v.array(v.string()),
    user: v.id("users"),
  }).index("by_user", ["user"]),
  favorites: defineTable({
    user: v.id("users"),
    recipe: v.id("recipes"),
  })
    .index("by_user", ["user"])
    .index("by_recipe", ["recipe"])
    .index("by_user_recipe", ["user", "recipe"]),
});
