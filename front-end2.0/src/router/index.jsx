import { createBrowserRouter } from 'react-router-dom'
import { App } from '../App'
import { LandingPage } from '../features/landing/LandingPage'
import { RegisterPage } from '../features/auth/components/RegisterPage'
import { DashboardPage } from '../features/dashboard/DashboardPage'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/registro', element: <RegisterPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
    ],
  },
])