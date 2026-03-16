import { useState } from 'react'
import toast from 'react-hot-toast'

export function Campaigns() {
  const [email, setEmail] = useState('')
  const handleNotify = (e) => {
    e.preventDefault()
    if (!email) { toast.error('Enter your email'); return }
    toast.success('You will be notified when campaigns launch!')
    setEmail('')
  }
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="text-7xl mb-6">🚀</div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
      <p className="text-xl text-gray-500 mb-3">Campaign Management is under development</p>
      <p className="text-gray-400 mb-8">Manage bulk QR codes, track campaign performance, collaborate with your team and apply custom branding — all in one place.</p>
      <div className="grid grid-cols-2 gap-4 mb-10 text-left">
        {[['📦','Bulk QR Generation','Create hundreds of QR codes at once'],['📊','Campaign Analytics','Track performance across campaigns'],['👥','Team Collaboration','Invite team members to collaborate'],['🎨','Custom Branding','Apply your brand to all QR codes']].map(([icon,title,desc])=>(
          <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="text-3xl mb-2">{icon}</div>
            <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
            <p className="text-gray-400 text-xs mt-1">{desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-indigo-50 rounded-2xl p-6">
        <p className="font-semibold text-indigo-700 mb-1">🗓️ Estimated Launch: Q2 2025</p>
        <p className="text-indigo-500 text-sm mb-4">Get notified when it launches</p>
        <form onSubmit={handleNotify} className="flex gap-3 max-w-sm mx-auto">
          <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} className="flex-1 border border-indigo-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <button type="submit" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">Notify Me</button>
        </form>
      </div>
    </div>
  )
}

export function Settings({ user, setUser }) {
  const [profile, setProfile] = useState({ name: user.name, email: user.email })
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })

  const saveProfile = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('qr_users') || '[]')
    const updated = users.map(u => u.email === user.email ? {...u, name: profile.name} : u)
    localStorage.setItem('qr_users', JSON.stringify(updated))
    setUser({ name: profile.name, email: user.email })
    toast.success('Profile updated!')
  }

  const changePassword = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('qr_users') || '[]')
    const found = users.find(u => u.email === user.email)
    if (!found || found.password !== passwords.current) { toast.error('Current password is wrong'); return }
    if (passwords.newPass.length < 6) { toast.error('New password must be 6+ chars'); return }
    if (passwords.newPass !== passwords.confirm) { toast.error('Passwords do not match'); return }
    const updated = users.map(u => u.email === user.email ? {...u, password: passwords.newPass} : u)
    localStorage.setItem('qr_users', JSON.stringify(updated))
    setPasswords({ current:'', newPass:'', confirm:'' })
    toast.success('Password changed!')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      {/* Profile */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-5">
        <h2 className="font-semibold text-gray-800 mb-4">Profile Settings</h2>
        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input value={profile.email} disabled className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed" />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">Save Profile</button>
        </form>
      </div>
      {/* Password */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-5">
        <h2 className="font-semibold text-gray-800 mb-4">Change Password</h2>
        <form onSubmit={changePassword} className="space-y-4">
          {[['Current Password','current'],['New Password','newPass'],['Confirm New Password','confirm']].map(([label,key])=>(
            <div key={key}>
              <label className="block text-sm text-gray-600 mb-1">{label}</label>
              <input type="password" value={passwords[key]} onChange={e=>setPasswords({...passwords,[key]:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ))}
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">Update Password</button>
        </form>
      </div>
      {/* Plan */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Current Plan</h2>
        <div className="flex items-center justify-between bg-indigo-50 rounded-xl p-4">
          <div>
            <p className="font-bold text-indigo-700 text-lg">Free Plan</p>
            <p className="text-indigo-500 text-sm">Unlimited QR codes • Local storage</p>
          </div>
          <span className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium">Active</span>
        </div>
      </div>
    </div>
  )
}

export default Campaigns
