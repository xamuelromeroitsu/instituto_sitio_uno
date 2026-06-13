import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { App } from '../App'
import { ProtectedRoute } from './ProtectedRoute'

const LandingPage = lazy(() =>
  import('../pages/LandingPage').then((m) => ({ default: m.LandingPage })),
)

const RegisterOverlay = lazy(() =>
  import('../pages/RegisterOverlay').then((m) => ({
    default: m.RegisterOverlay,
  })),
)

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)

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
        children: [
          { path: '/', element: <LandingPage /> },
          { path: '/registro', element: <RegisterOverlay /> },
          {
            path: '/dashboard',
            element: (
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
])
