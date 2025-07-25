// src/routes/index.tsx
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { api } from '../../convex/_generated/api'
import { convexQuery } from '@convex-dev/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import CreateRecipe from '../components/CreateRecipe'

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
    <main className="px-12 py-6">
      <h1 className="text-2xl font-medium mb-6">The Flavor Files</h1>
      <CreateRecipe />
      {recipes ? (
        <ol className="list-decimal ml-4">
          {recipes.map((recipe) => {
            return (
              <li key={recipe._id}>
                <p className="text-sm">{recipe.name}</p>
              </li>
            )
          })}
        </ol>
      ) : (
        <p>No recipes found.</p>
      )}
    </main>
  )
}
