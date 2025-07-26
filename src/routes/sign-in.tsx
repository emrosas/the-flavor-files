import { createFileRoute, Link } from '@tanstack/react-router'
import Logo from '../assets/svg/logo.svg?react'
import { SignIn } from '@clerk/tanstack-react-start'

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="px-12 flex flex-col py-12">
        <Link to="/" className="flex items-center gap-2 mb-24">
          <Logo className="size-16" />{' '}
          <h1 className="text-4xl">The Flavor Files</h1>
        </Link>
        <SignIn routing="path" path="/sign-in" forceRedirectUrl="/" />
      </div>
      <div className="bg-brand-1" />
    </main>
  )
}
