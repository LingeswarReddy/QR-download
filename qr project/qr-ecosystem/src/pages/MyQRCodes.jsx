import { useState, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Trash2, Download, Search } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MyQRCodes({ user }) {
  const [qrCodes, setQrCodes] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('qr_codes') || '[]')
    setQrCodes(all.filter(q => q.userEmail === user.email))
  }, [user.email])

  const filtered = qrCodes.filter(q => {
    const matchSearch = q.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || q.type === filter
    return matchSearch && matchFilter
  })

  const deleteQR = (id) => {
    const all = JSON.parse(localStorage.getItem('qr_codes') || '[]')
    const updated = all.filter(q => q.id !== id)
    localStorage.setItem('qr_codes', JSON.stringify(updated))
    setQrCodes(updated.filter(q => q.userEmail === user.email))
    toast.success('Deleted!')
  }

  const downloadQR = (qr) => {
    const canvas = document.getElementById(`myqr-${qr.id}`)
    if (canvas) {
      const link = document.createElement('a')
      link.download = `${qr.name}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      toast.success('Downloaded!')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My QR Codes</h1>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input placeholder="Search by name..." value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Types</option>
          <option value="url">URL</option>
          <option value="wifi">WiFi</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="text">Text</option>
        </select>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400">No QR codes found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(qr => (
            <div key={qr.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <div className="flex justify-center bg-gray-50 rounded-xl p-3 mb-3">
                <QRCodeCanvas id={`myqr-${qr.id}`} value={qr.content || 'https://example.com'} size={120} fgColor={qr.fgColor||'#000000'} bgColor={qr.bgColor||'#FFFFFF'} level="H" includeMargin />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${qr.type==='url'?'bg-blue-100 text-blue-700':qr.type==='wifi'?'bg-green-100 text-green-700':'bg-purple-100 text-purple-700'}`}>{qr.type?.toUpperCase()}</span>
              <p className="font-semibold text-sm text-gray-800 mt-2 truncate">{qr.name}</p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{qr.content}</p>
              <p className="text-xs text-gray-400 mt-1">📅 {new Date(qr.createdAt).toLocaleDateString()}</p>
              <p className="text-xs text-gray-400">📊 {qr.scans || 0} scans</p>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>downloadQR(qr)} className="flex-1 flex items-center justify-center gap-1 bg-indigo-50 text-indigo-600 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-100">
                  <Download size={13}/> Download
                </button>
                <button onClick={()=>deleteQR(qr.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-500 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100">
                  <Trash2 size={13}/> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
