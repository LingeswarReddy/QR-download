import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Settings({ user, setUser }) {
  const [profile, setProfile] = useState({ name: user.name, email: user.email })
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })

  const saveProfile = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('qr_users') || '[]')
    const updated = users.map(u => u.email === user.email ? { ...u, name: profile.name } : u)
    localStorage.setItem('qr_users', JSON.stringify(updated))
    setUser({ name: profile.name, email: user.email })
    toast.success('Profile updated!')
  }

  const changePassword = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('qr_users') || '[]')
    const found = users.find(u => u.email === user.email)
    if (!found || found.password !== passwords.current) { toast.error('Current password is wrong'); return }
    if (passwords.newPass.length < 6) { toast.error('Min 6 characters'); return }
    if (passwords.newPass !== passwords.confirm) { toast.error('Passwords do not match'); return }
    const updated = users.map(u => u.email === user.email ? { ...u, password: passwords.newPass } : u)
    localStorage.setItem('qr_users', JSON.stringify(updated))
    setPasswords({ current: '', newPass: '', confirm: '' })
    toast.success('Password changed!')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-5">
        <h2 className="font-semibold text-gray-800 mb-4">Profile Settings</h2>
        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input value={profile.email} disabled className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400" />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
            Save Profile
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-5">
        <h2 className="font-semibold text-gray-800 mb-4">Change Password</h2>
        <form onSubmit={changePassword} className="space-y-4">
          {[['Current Password', 'current'], ['New Password', 'newPass'], ['Confirm Password', 'confirm']].map(([label, key]) => (
            <div key={key}>
              <label className="block text-sm text-gray-600 mb-1">{label}</label>
              <input type="password" value={passwords[key]} onChange={e => setPasswords({ ...passwords, [key]: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ))}
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
            Update Password
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Current Plan</h2>
        <div className="flex items-center justify-between bg-indigo-50 rounded-xl p-4">
          <div>
            <p className="font-bold text-indigo-700 text-lg">Free Plan</p>
            <p className="text-indigo-500 text-sm">Unlimited QR codes • All features included</p>
          </div>
          <span className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium">Active</span>
        </div>
      </div>
    </div>
  )
}
