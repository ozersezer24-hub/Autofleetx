import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )

    // küçük bir sorgu ile bağlantı testi
    const { error } = await supabase.from('cars').select('id').limit(1)
    if (error) throw error

    res.status(200).json({ ok: true })
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e.message })
  }
}
