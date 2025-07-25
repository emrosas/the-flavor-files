// src/routes/index.tsx
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { api } from '../../convex/_generated/api'
import { convexQuery } from '@convex-dev/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import CreateRecipe from '../components/CreateRecipe'
import RecipeCard from '../components/RecipeCard'

export const Route = createFileRoute('/')({
  component: Home,
  // loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  // const state = Route.useLoaderData()
  const { data: recipes } = useSuspenseQuery(
    convexQuery(api.recipes.getAllRecipes, {}),
  )

  return (
    <main className="px-12 py-6 grid grid-cols-[1fr_3fr] gap-8">
      <div>
        <h1 className="text-4xl font-medium mb-6">The Flavor Files</h1>
        <CreateRecipe />
      </div>
      <div>
        <h2 className="text-2xl font-medium mb-4">Popular Recipes</h2>
        {recipes ? (
          <ul className="grid grid-cols-3 gap-6">
            {recipes.map((recipe) => {
              return <RecipeCard recipe={recipe} />
            })}
          </ul>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </main>
  )
}
