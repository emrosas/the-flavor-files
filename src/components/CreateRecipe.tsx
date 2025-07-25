import { useMutation } from 'convex/react'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'

export default function CreateRecipe() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cookingTime, setCookingTime] = useState(15)

  const createRecipe = useMutation(api.recipes.createRecipe)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createRecipe({
      name,
    })
    setName('')
    setDescription('')
    setCookingTime(15)
  }

  return (
    <form className="max-w-96 mb-6" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-1 mb-2">
        Name
        <input
          type="text"
          className="border border-stone-500 rounded-md px-2 py-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button className="bg-amber-700 text-amber-50 rounded-md px-2 py-1">
        Submit
      </button>
    </form>
  )
}
