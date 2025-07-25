import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  recipes: defineTable({
    name: v.string(),
    description: v.string(),
    cookingTime: v.float64(),
  }),

  notes: defineTable({ text: v.string() }),
})
