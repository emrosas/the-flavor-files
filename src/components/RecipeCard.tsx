import type { Doc } from '../../convex/_generated/dataModel'

export default function RecipeCard({ recipe }: { recipe: Doc<'recipes'> }) {
  return (
    <li
      key={recipe._id}
      className="flex flex-col px-4 py-2 rounded-lg bg-white border border-s-stone-500"
    >
      <h4 className="text-2xl font-medium">{recipe.name}</h4>
      <p className="text-sm mb-2">{recipe.description}</p>
      <div className="grow flex items-end justify-end">
        <p className="text-sm">
          <strong>Cooking Time: </strong>
          {recipe.cookingTime} minutes
        </p>
      </div>
    </li>
  )
}
