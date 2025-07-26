// SVG Imports
import Logo from '../assets/svg/logo.svg?react'
import Glasses from '../assets/svg/glasses.svg?react'
import Heart from '../assets/svg/heart.svg?react'
import Plus from '../assets/svg/plus.svg?react'

import { Link } from '@tanstack/react-router'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/tanstack-react-start'

export default function Navbar() {
  return (
    <nav className="px-12 py-4 flex gap-12 justify-between">
      <div className="flex items-center">
        <Logo className="size-10" />
        <div className="grid grid-cols-3 bg-latte-3 rounded-md overflow-clip">
          <Link
            className="flex items-center justify-center gap-2 px-3 py-1 rounded-md  text-latte-1 text-center bg-brand-1"
            to="/"
          >
            <Glasses className="size-4" />
            Browse
          </Link>
          <Link
            className="flex items-center justify-center gap-2 px-3 text-latte-5 py-1 rounded-md text-center"
            to="/favorites"
          >
            <Heart className="size-4" />
            Favorites
          </Link>
          <Link
            className="flex items-center justify-center gap-2 px-3 text-latte-5 py-1 rounded-md text-center"
            to="/create"
          >
            <Plus className="size-4" />
            Create
          </Link>
        </div>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <span className="bg-brand-1 hover:bg-brand-2 transition px-4 py-2 text-latte-1 rounded-lg cursor-pointer">
            Sign In
          </span>
        </SignInButton>
      </SignedOut>
    </nav>
  )
}
