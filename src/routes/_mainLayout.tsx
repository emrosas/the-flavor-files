import { Outlet, createFileRoute } from '@tanstack/react-router'
import Navbar from '../components/Navbar'

export const Route = createFileRoute('/_mainLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
