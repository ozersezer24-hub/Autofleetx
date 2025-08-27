import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )

  const { title, brand, model, year, price } = req.body || {}
  if (!title || !brand || !model || !year || !price) {
    return res.status(400).json({ ok: false, error: 'Eksik alanlar var' })
  }

  const { error } = await supabase.from('cars').insert([{
    title, brand, model, year, price, status: 'pending'
  }])

  if (error) {
    return res.status(500).json({ ok: false, error: error.message })
  }

  return res.status(200).json({ ok: true })
}
