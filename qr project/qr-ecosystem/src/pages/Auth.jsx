import { useState } from 'react'
import { QrCode, Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Auth({ onLogin }) {
  const [tab, setTab] = useState('signin')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const handleSignIn = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Fill all fields'); return }
    const users = JSON.parse(localStorage.getItem('qr_users') || '[]')
    const found = users.find(u => u.email === form.email && u.password === form.password)
    if (!found) { toast.error('Invalid email or password'); return }
    toast.success('Welcome back!')
    onLogin({ name: found.name, email: found.email })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast.error('Fill all fields'); return }
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be 6+ characters'); return }
    const users = JSON.parse(localStorage.getItem('qr_users') || '[]')
    if (users.find(u => u.email === form.email)) { toast.error('Email already exists'); return }
    users.push({ name: form.name, email: form.email, password: form.password })
    localStorage.setItem('qr_users', JSON.stringify(users))
    toast.success('Account created!')
    onLogin({ name: form.name, email: form.email })
  }

  const handleGoogle = () => toast('Google login requires OAuth setup. Use email/password for now.', { icon: 'ℹ️' })
  const handleGithub = () => toast('GitHub login requires OAuth setup. Use email/password for now.', { icon: 'ℹ️' })

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 flex-col items-center justify-center p-12 text-white">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white/20 p-3 rounded-2xl">
            <QrCode size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold">QR Ecosystem</h1>
        </div>
        <p className="text-xl text-indigo-200 text-center mb-10">
          The most powerful QR Code platform for businesses
        </p>
        <div className="space-y-4 w-full max-w-sm">
          {['🚀 Generate beautiful QR codes instantly', '📊 Track scans with real-time analytics', '🎨 Customize colors and add your logo', '🔄 Dynamic QR codes — update anytime', '📱 Mobile-friendly scanning guaranteed'].map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 text-sm">
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {/* Logo mobile */}
          <div className="flex lg:hidden items-center gap-2 justify-center mb-6">
            <QrCode size={28} className="text-indigo-600" />
            <span className="text-2xl font-bold text-indigo-600">QR Ecosystem</span>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button onClick={() => setTab('signin')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${tab === 'signin' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>
              Sign In
            </button>
            <button onClick={() => setTab('signup')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${tab === 'signup' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>
              Sign Up
            </button>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3 mb-6">
            <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition font-medium text-gray-700">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button onClick={handleGithub} className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white rounded-xl py-3 hover:bg-gray-800 transition font-medium">
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Sign In Form */}
          {tab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input type="email" placeholder="Email address" value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input type={showPass ? 'text' : 'password'} placeholder="Password" value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-gray-400">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="text-right">
                <button type="button" className="text-indigo-600 text-sm hover:underline">Forgot Password?</button>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
                Sign In
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {tab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="relative">
                <User size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input type="text" placeholder="Full Name" value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input type="email" placeholder="Email address" value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input type={showPass ? 'text' : 'password'} placeholder="Password (min 6 chars)" value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-gray-400">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input type="password" placeholder="Confirm Password" value={form.confirm}
                  onChange={e => setForm({...form, confirm: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
