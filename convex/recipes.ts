import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const getAllRecipes = query({
  handler: async (ctx) => {
    const recipes = await ctx.db.query('recipes').order('desc').take(10)
    return recipes
  },
})

export const createRecipe = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    cookingTime: v.number(),
  },
  handler: async (ctx, { name, description, cookingTime }) => {
    const recipeId = await ctx.db.insert('recipes', {
      name,
      description,
      cookingTime,
    })
    return recipeId
  },
})
