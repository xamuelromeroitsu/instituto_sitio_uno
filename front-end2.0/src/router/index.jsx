import { Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { App } from '../App'
import { routes } from './routes'

function SuspenseFallback() {
  return (
    <Suspense fallback={<div className="page-content"><p>Cargando…</p></div>}>
      <Outlet />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <SuspenseFallback />,
        children: routes,
      },
    ],
  },
])
