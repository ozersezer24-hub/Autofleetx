import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

type Car = {
  id: string
  title: string
  brand: string
  model: string
  year: number
  price: number
  city: string | null
  created_at: string
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export default function Listings() {
  const [items, setItems] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string>('')

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('id,title,brand,model,year,price,city,created_at')
          .order('created_at', { ascending: false })
          .limit(50)
        if (error) throw error
        setItems(data || [])
      } catch (e: any) {
        setErr(e.message || 'Bir hata oluştu')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h1>İlanlar</h1>
      {loading && <p>Yükleniyor…</p>}
      {err && <p style={{ color: 'crimson' }}>Hata: {err}</p>}

      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((c) => (
          <div key={c.id} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
            <div style={{ fontWeight: 700 }}>{c.title}</div>
            <div>
              {c.brand} {c.model} • {c.year} • {c.city || '-'}
            </div>
            <div style={{ fontWeight: 600 }}>{Number(c.price || 0).toLocaleString('tr-TR')} TL</div>
          </div>
        ))}
        {!loading && !items.length && <div>Henüz ilan yok.</div>}
      </div>
    </div>
  )
}
