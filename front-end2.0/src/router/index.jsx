import { lazy, Suspense, useEffect } from 'react'
import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom'
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

const ProfilePage = lazy(() =>
  import('../pages/ProfilePage').then((m) => ({ default: m.ProfilePage })),
)

const titles = {
  '/': 'Instituto Tecnológico Sitio Uno',
  '/registro': 'Registro | ITSU',
  '/dashboard': 'Dashboard | ITSU',
  '/dashboard/perfil': 'Mi Perfil | ITSU',
}

function SuspenseFallback() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] || 'ITSU'
  }, [pathname])

  return (
    <Suspense fallback={<div className="page-content" style={{ display: 'grid', gap: '18px', paddingTop: '80px' }}><div className="skeleton skeleton--title" /><div className="skeleton" style={{ height: 200 }} /></div>}>
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
          {
            path: '/dashboard/perfil',
            element: (
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
])
