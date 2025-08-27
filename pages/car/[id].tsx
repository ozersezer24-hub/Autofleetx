import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

type Car = {
  id: string
  title: string
  brand: string | null
  model: string | null
  year: number | null
  km?: number | null
  city?: string | null
  price: number | null
  description?: string | null
  created_at: string
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export default function CarDetail() {
  const router = useRouter()
  const { id } = router.query
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', body: '' })

  useEffect(() => {
    if (!id) return
    ;(async () => {
      setLoading(true)
      const { data, error } = await supabase.from('cars').select('*').eq('id', id).maybeSingle()
      if (error) setStatus('Hata: ' + error.message)
      setCar(data as any)
      setLoading(false)
    })()
  }, [id])

  async function sendMessage(e: any) {
    e.preventDefault()
    setStatus('Gönderiliyor…')
    const resp = await fetch('/api/messages/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ car_id: id, ...form })
    })
    const js = await resp.json()
    if (!js.ok) {
      setStatus('Hata: ' + (js.error || 'Mesaj gönderilemedi'))
    } else {
      setStatus('✅ Mesaj gönderildi')
      setForm({ name: '', phone: '', body: '' })
    }
  }

  if (loading) return <div style={{ padding: 24 }}>Yükleniyor…</div>
  if (!car) return <div style={{ padding: 24 }}>İlan bulunamadı.</div>

  return (
    <div style={{ padding: 24, display: 'grid', gap: 12 }}>
      <a href="/listings">← İlanlara dön</a>
      <h1>{car.title}</h1>
      <div>
        {car.brand || '-'} {car.model || ''} • {car.year || '-'} • {car.city || '-'}
      </div>
      <div style={{ fontWeight: 700, fontSize: 18 }}>
        {Number(car.price || 0).toLocaleString('tr-TR')} TL
      </div>
      {car.description && <p style={{ maxWidth: 640 }}>{car.description}</p>}

      <form onSubmit={sendMessage} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <h3>Satıcıya mesaj gönder</h3>
        <input placeholder="Adınız" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Telefon" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <textarea
          placeholder="Mesajınız"
          rows={4}
          value={form.body}
          onChange={e => setForm({ ...form, body: e.target.value })}
        />
        <button type="submit">Gönder</button>
        {status && <div style={{ color: '#666' }}>{status}</div>}
      </form>
    </div>
  )
}
