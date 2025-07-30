import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
import { timeOptions } from "../shared/timeOptions";

export const timeValidator = v.union(...timeOptions.map(v.literal));

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // other "users" fields...
  }).index("email", ["email"]),
  recipes: defineTable({
    author: v.id("users"),
    title: v.string(),
    description: v.string(),
    time: timeValidator,
    ingredients: v.array(v.string()),
    instructions: v.array(v.string()),
    featured: v.boolean(),
  }).index("by_author", ["author"]),
  favorites: defineTable({
    user: v.id("users"),
    recipe: v.id("recipes"),
  })
    .index("by_user", ["user"])
    .index("by_recipe", ["recipe"])
    .index("by_user_recipe", ["user", "recipe"]),
});
