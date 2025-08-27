import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )

  const { car_id, name, phone, body } = req.body || {}
  if (!car_id || !body) return res.status(400).json({ ok: false, error: 'Eksik alan' })

  // Basit güvenlik filtresi
  const text = String(body).slice(0, 2000)
  const bad = /(https?:\/\/|whatsapp|kapora|havale)/i
  if (bad.test(text)) return res.status(400).json({ ok: false, error: 'Mesaj içeriği reddedildi' })

  const { error } = await supabase
    .from('messages')
    .insert({ car_id, sender: (name || 'Misafir').toString().slice(0, 80), phone: (phone || '').toString().slice(0, 40), body: text })

  if (error) return res.status(500).json({ ok: false, error: error.message })
  return res.status(200).json({ ok: true })
}
