import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/favorites')({
  component: Favorites,
})

function Favorites() {
  return (
    <div>
      <h1>Favorites</h1>
      <p>Soon you'll be able to save your favorite recipes here!</p>
    </div>
  )
}
