import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getAuth } from '@clerk/tanstack-react-start/server'
import { getWebRequest } from '@tanstack/react-start/server'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

const authStateFn = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getWebRequest()
  if (!request) throw new Error('No request found')
  const { userId } = await getAuth(request)

  if (!userId) {
    // This will error because you're redirecting to a path that doesn't exist yet
    // You can create a sign-in route to handle this
    // See https://clerk.com/docs/references/tanstack-start/custom-sign-in-or-up-page
    throw redirect({
      to: '/',
    })
  }

  return { userId }
})

export const Route = createFileRoute('/_protected')({
  component: ProtectedRoute,
  beforeLoad: async () => await authStateFn(),
  loader: async ({ context }) => {
    return { userId: context.userId }
  },
})

function ProtectedRoute() {
  // const state = Route.useLoaderData()

  return (
    <main className="px-12 py-6">
      <Outlet />
    </main>
  )
}
