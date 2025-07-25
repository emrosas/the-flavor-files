import { createFileRoute } from '@tanstack/react-router'
import CreateRecipe from '../../components/CreateRecipe'

export const Route = createFileRoute('/_protected/create')({
  component: CreateRecipe,
})
