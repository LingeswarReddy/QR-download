import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart2 } from 'lucide-react'

export default function Analytics({ user }) {
  const [qrCodes, setQrCodes] = useState([])

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('qr_codes') || '[]')
    setQrCodes(all.filter(q => q.userEmail === user.email))
  }, [user.email])

  const totalScans = qrCodes.reduce((s, q) => s + (q.scans || 0), 0)
  const chartData = qrCodes.map(q => ({ name: q.name.length > 12 ? q.name.slice(0,12)+'...' : q.name, scans: q.scans || 0 }))
  const typeData = ['url','wifi','email','sms','text'].map(t => ({ type: t.toUpperCase(), count: qrCodes.filter(q=>q.type===t).length })).filter(d=>d.count>0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[['Total QR Codes', qrCodes.length,'bg-indigo-500'],['Total Scans', totalScans,'bg-green-500'],['Avg Scans/QR', qrCodes.length ? (totalScans/qrCodes.length).toFixed(1) : 0,'bg-purple-500']].map(([l,v,c])=>(
          <div key={l} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`${c} p-3 rounded-xl`}><BarChart2 size={22} className="text-white"/></div>
            <div><p className="text-2xl font-bold text-gray-800">{v}</p><p className="text-gray-500 text-sm">{l}</p></div>
          </div>
        ))}
      </div>

      {qrCodes.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <BarChart2 size={48} className="mx-auto text-gray-200 mb-3"/>
          <p className="text-gray-500">No data yet. Create QR codes to see analytics.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Scans per QR Code</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis dataKey="name" tick={{fontSize:12}}/>
                <YAxis tick={{fontSize:12}}/>
                <Tooltip/>
                <Bar dataKey="scans" fill="#6366f1" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">QR Codes by Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis dataKey="type" tick={{fontSize:12}}/>
                <YAxis tick={{fontSize:12}}/>
                <Tooltip/>
                <Bar dataKey="count" fill="#8b5cf6" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
