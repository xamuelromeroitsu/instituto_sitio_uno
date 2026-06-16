import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

const LandingPage = lazy(() =>
  import('../pages/LandingPage').then((m) => ({ default: m.LandingPage })),
)

const AuthOverlay = lazy(() =>
  import('../pages/AuthOverlay').then((m) => ({ default: m.AuthOverlay })),
)

const DashboardLayout = lazy(() =>
  import('../layouts/DashboardLayout').then((m) => ({ default: m.DashboardLayout })),
)

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)

export const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/iniciar-sesion', element: <AuthOverlay mode="login" /> },
  { path: '/registro', element: <AuthOverlay mode="register" /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]
