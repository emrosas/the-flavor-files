// src/routes/__root.tsx
/// <reference types="vite/client" />

import appCss from '../styles/app.css?url'

import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Outlet, HeadContent, Scripts } from '@tanstack/react-router'
import { ClerkProvider } from '@clerk/tanstack-react-start'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ClerkProvider>
      <html>
        <head>
          <HeadContent />
        </head>
        <body className="bg-[#F7F2E8] text-[#1B1A1A]">
          {children}
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  )
}
