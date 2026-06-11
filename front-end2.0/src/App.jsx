import './App.css'
import { useState } from 'react'
import { LandingPage } from './features/landing/LandingPage'
import { AuthModal } from './features/auth/components/AuthModal'

function App() {
  const [authMode, setAuthMode] = useState(null)

  return (
    <div className="app-shell">
      <LandingPage
        onOpenLogin={() => setAuthMode('login')}
        onOpenRegister={() => setAuthMode('register')}
      />
      <AuthModal
        mode={authMode}
        onClose={() => setAuthMode(null)}
        onSwitchMode={setAuthMode}
      />
    </div>
  )
}

export default App
