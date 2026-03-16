import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { QrCode, Scan, Activity, Plus, Trash2, Download, RefreshCw } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import toast from 'react-hot-toast'

export default function Dashboard({ user }) {
  const [qrCodes, setQrCodes] = useState([])

  const loadQRCodes = () => {
    const all = JSON.parse(localStorage.getItem('qr_codes') || '[]')
    setQrCodes(all.filter(q => q.userEmail === user.email))
  }

  useEffect(() => { loadQRCodes() }, [user.email])

  const totalScans = qrCodes.reduce((sum, q) => sum + (q.scans || 0), 0)
  const activeQR = qrCodes.filter(q => q.status === 'active').length

  const deleteQR = (id) => {
    const all = JSON.parse(localStorage.getItem('qr_codes') || '[]')
    localStorage.setItem('qr_codes', JSON.stringify(all.filter(q => q.id !== id)))
    loadQRCodes()
    toast.success('QR Code deleted')
  }

  const downloadQR = (qr) => {
    const canvas = document.getElementById(`qr-${qr.id}`)
    if (canvas) {
      const link = document.createElement('a')
      link.download = `${qr.name}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      toast.success('Downloaded!')
    }
  }

  const stats = [
    { label: 'Total QR Codes', value: qrCodes.length, icon: QrCode, color: 'bg-indigo-500' },
    { label: 'Total Scans', value: totalScans, icon: Scan, color: 'bg-green-500' },
    { label: 'Active Codes', value: activeQR, icon: Activity, color: 'bg-purple-500' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, {user.name}!</p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadQRCodes} className="p-2 border rounded-xl hover:bg-gray-50 text-gray-600" title="Refresh">
            <RefreshCw size={18} />
          </button>
          <Link to="/create" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition text-sm font-medium">
            <Plus size={16} /> Create QR
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`${color} p-3 rounded-xl`}>
              <Icon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* QR Codes Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your QR Codes</h2>
        {qrCodes.length === 0 ? (
          <div className="text-center py-16">
            <QrCode size={60} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium">No QR codes yet</p>
            <p className="text-gray-400 text-sm mb-5">Create your first QR code to get started</p>
            <Link to="/create" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
              Create QR Code
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {qrCodes.map(qr => (
              <div key={qr.id} className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition">
                <div className="flex justify-center mb-3 bg-gray-50 rounded-xl p-3">
                  <QRCodeCanvas
                    id={`qr-${qr.id}`}
                    value={qr.content || qr.url || 'https://example.com'}
                    size={120}
                    fgColor={qr.fgColor || '#000000'}
                    bgColor={qr.bgColor || '#FFFFFF'}
                    level="H"
                  />
                </div>
                <div className="mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${qr.type === 'url' ? 'bg-blue-100 text-blue-700' : qr.type === 'wifi' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                    {qr.type?.toUpperCase()}
                  </span>
                </div>
                <p className="font-semibold text-gray-800 text-sm truncate">{qr.name}</p>
                <p className="text-gray-400 text-xs truncate mt-0.5">{qr.content || qr.url}</p>
                <p className="text-gray-400 text-xs mt-1">📊 {qr.scans || 0} scans</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => downloadQR(qr)} className="flex-1 flex items-center justify-center gap-1 bg-indigo-50 text-indigo-600 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-100 transition">
                    <Download size={13} /> Download
                  </button>
                  <button onClick={() => deleteQR(qr.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-500 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
