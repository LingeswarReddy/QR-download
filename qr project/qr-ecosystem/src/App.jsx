import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import CreateQR from './pages/CreateQR'
import MyQRCodes from './pages/MyQRCodes'
import Analytics from './pages/Analytics'
import Campaigns from './pages/Campaigns'
import Settings from './pages/Settings'
import Layout from './components/layout/Layout'

function PrivateRoute({ children, user }) {
  return user ? children : <Navigate to="/auth" replace />
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('qr_user')
    return saved ? JSON.parse(saved) : null
  })

  const handleLogin = (userData) => {
    localStorage.setItem('qr_user', JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('qr_user')
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/auth" element={
          user ? <Navigate to="/dashboard" replace /> : <Auth onLogin={handleLogin} />
        } />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/auth"} replace />} />
        <Route path="/dashboard" element={
          <PrivateRoute user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <Dashboard user={user} />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/create" element={
          <PrivateRoute user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <CreateQR user={user} />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/my-qr-codes" element={
          <PrivateRoute user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <MyQRCodes user={user} />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/analytics" element={
          <PrivateRoute user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <Analytics user={user} />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/campaigns" element={
          <PrivateRoute user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <Campaigns />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/settings" element={
          <PrivateRoute user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <Settings user={user} setUser={handleLogin} />
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
