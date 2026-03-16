import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'

const QR_TYPES = [
  { id: 'url', label: 'URL', icon: '🔗', placeholder: 'https://example.com' },
  { id: 'wifi', label: 'WiFi', icon: '📶', placeholder: '' },
  { id: 'email', label: 'Email', icon: '📧', placeholder: 'you@example.com' },
  { id: 'sms', label: 'SMS', icon: '💬', placeholder: '+1234567890' },
  { id: 'text', label: 'Text', icon: '📝', placeholder: 'Enter any text...' },
]

function getContrastRatio(hex1, hex2) {
  const toLum = (hex) => {
    const r = parseInt(hex.slice(1,3),16)/255
    const g = parseInt(hex.slice(3,5),16)/255
    const b = parseInt(hex.slice(5,7),16)/255
    const toLinear = c => c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4)
    return 0.2126*toLinear(r) + 0.7152*toLinear(g) + 0.0722*toLinear(b)
  }
  const l1 = toLum(hex1), l2 = toLum(hex2)
  return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)
}

export default function CreateQR({ user }) {
  const navigate = useNavigate()
  const [type, setType] = useState('url')
  const [form, setForm] = useState({ url:'', ssid:'', wifiPass:'', security:'WPA', email:'', subject:'', phone:'', message:'', text:'' })
  const [design, setDesign] = useState({ fgColor:'#000000', bgColor:'#FFFFFF', size:250 })
  const [name, setName] = useState('')

  const buildContent = () => {
    if (type === 'url') return form.url || 'https://example.com'
    if (type === 'wifi') return `WIFI:T:${form.security};S:${form.ssid};P:${form.wifiPass};;`
    if (type === 'email') return `mailto:${form.email}?subject=${form.subject}`
    if (type === 'sms') return `sms:${form.phone}?body=${form.message}`
    return form.text || 'Sample Text'
  }

  const contrast = getContrastRatio(design.fgColor, design.bgColor)
  const lowContrast = contrast < 3

  const handleSave = () => {
    if (!name.trim()) { toast.error('Please enter a QR code name'); return }
    const content = buildContent()
    if (type === 'url' && !form.url) { toast.error('Please enter a URL'); return }
    const newQR = {
      id: Date.now().toString(),
      userEmail: user.email,
      name: name.trim(),
      type, content,
      url: form.url,
      fgColor: design.fgColor,
      bgColor: design.bgColor,
      size: design.size,
      scans: 0,
      status: 'active',
      createdAt: new Date().toISOString()
    }
    const all = JSON.parse(localStorage.getItem('qr_codes') || '[]')
    all.push(newQR)
    localStorage.setItem('qr_codes', JSON.stringify(all))
    toast.success('QR Code saved successfully!')
    navigate('/dashboard')
  }

  const downloadQR = () => {
    const canvas = document.getElementById('preview-canvas')
    if (canvas) {
      const link = document.createElement('a')
      link.download = `${name || 'qrcode'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      toast.success('Downloaded!')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create QR Code</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Builder */}
        <div className="lg:col-span-2 space-y-5">

          {/* Step 1: Type */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">1. Choose Type</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {QR_TYPES.map(t => (
                <button key={t.id} onClick={() => setType(t.id)}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition ${type === t.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <span className="text-2xl">{t.icon}</span>
                  <span className="text-xs font-medium mt-1 text-gray-700">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Content */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">2. Enter Content</h2>
            {type === 'url' && <input type="url" placeholder="https://your-website.com" value={form.url} onChange={e=>setForm({...form,url:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />}
            {type === 'wifi' && (
              <div className="space-y-3">
                <input placeholder="Network Name (SSID)" value={form.ssid} onChange={e=>setForm({...form,ssid:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="password" placeholder="WiFi Password" value={form.wifiPass} onChange={e=>setForm({...form,wifiPass:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <select value={form.security} onChange={e=>setForm({...form,security:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>WPA</option><option>WEP</option><option>nopass</option>
                </select>
              </div>
            )}
            {type === 'email' && (
              <div className="space-y-3">
                <input type="email" placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input placeholder="Subject" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            )}
            {type === 'sms' && (
              <div className="space-y-3">
                <input placeholder="Phone Number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            )}
            {type === 'text' && <textarea placeholder="Enter your text..." value={form.text} onChange={e=>setForm({...form,text:e.target.value})} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />}
          </div>

          {/* Step 3: Design */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">3. Customize Design</h2>
            {lowContrast && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm">
                <AlertTriangle size={16} />
                <span>Low contrast! QR may not scan on mobile. Use dark on white for best results.</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Foreground Color</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
                  <input type="color" value={design.fgColor} onChange={e=>setDesign({...design,fgColor:e.target.value})} className="w-8 h-8 rounded cursor-pointer border-0" />
                  <span className="text-sm text-gray-600">{design.fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Background Color</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
                  <input type="color" value={design.bgColor} onChange={e=>setDesign({...design,bgColor:e.target.value})} className="w-8 h-8 rounded cursor-pointer border-0" />
                  <span className="text-sm text-gray-600">{design.bgColor}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm text-gray-600 mb-2">Size: {design.size}px</label>
              <input type="range" min="150" max="500" value={design.size} onChange={e=>setDesign({...design,size:Number(e.target.value)})} className="w-full accent-indigo-600" />
            </div>
            <button onClick={()=>setDesign({...design,fgColor:'#000000',bgColor:'#FFFFFF'})} className="mt-3 flex items-center gap-2 text-sm text-indigo-600 hover:underline">
              <RotateCcw size={14} /> Reset to Safe Colors (Black on White)
            </button>
            <p className="text-xs text-gray-400 mt-2">💡 Tip: Dark color on white background gives best scan results on all devices</p>
          </div>

          {/* Step 4: Name */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">4. Name Your QR Code</h2>
            <input placeholder="e.g. My Website QR, WiFi QR, etc." value={name} onChange={e=>setName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        {/* Right: Preview */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
            <h2 className="font-semibold text-gray-800 mb-4 text-center">Live Preview</h2>
            <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4 mb-4">
              <QRCodeCanvas
                id="preview-canvas"
                value={buildContent()}
                size={200}
                fgColor={design.fgColor}
                bgColor={design.bgColor}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="space-y-3">
              <button onClick={handleSave} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
                💾 Save QR Code
              </button>
              <button onClick={downloadQR} className="w-full border border-indigo-300 text-indigo-600 py-3 rounded-xl font-medium hover:bg-indigo-50 transition">
                ⬇️ Download PNG
              </button>
              <button onClick={()=>navigate('/dashboard')} className="w-full border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
