// import { v } from "convex/values";
import { query } from "./_generated/server";
// import { api } from "./_generated/api";
// import { getAuthUserId } from "@convex-dev/auth/server";

export const getTopFeatured = query({
  handler: async (ctx) => {
    return ctx.db
      .query("recipes")
      .filter((q) => q.eq(q.field("featured"), true))
      .take(3);
  },
});
