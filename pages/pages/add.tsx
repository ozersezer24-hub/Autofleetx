import { useState } from 'react'

export default function AddCar() {
  const [form, setForm] = useState({ title:'', brand:'', model:'', year:'', price:'' })
  const [status, setStatus] = useState('')

  async function handleSubmit(e:any) {
    e.preventDefault()
    setStatus('Kaydediliyor...')
    const res = await fetch('/api/cars/add', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(form)
    })
    const js = await res.json()
    if(js.ok) setStatus('✅ İlan eklendi')
    else setStatus('❌ Hata: '+js.error)
  }

  return (
    <div style={{padding:40}}>
      <h1>🚗 Yeni İlan Ekle</h1>
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:10,maxWidth:300}}>
        <input placeholder="Başlık" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input placeholder="Marka" value={form.brand} onChange={e=>setForm({...form,brand:e.target.value})} />
        <input placeholder="Model" value={form.model} onChange={e=>setForm({...form,model:e.target.value})} />
        <input placeholder="Yıl" value={form.year} onChange={e=>setForm({...form,year:e.target.value})} />
        <input placeholder="Fiyat" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
        <button type="submit">Kaydet</button>
      </form>
      <p>{status}</p>
    </div>
  )
}
