# AutoFleetX (Mini)

## Gerekli env (Vercel → Project → Settings → Environment Variables)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SITE_URL  (ör: https://proje-adin.vercel.app)

## Kurulum
1) Supabase SQL Editor → `supabase_schema.sql` içeriğini çalıştır.
2) Vercel → New Project → Bu GitHub reposunu bağla → env değişkenlerini gir → Deploy.

## Test
- `/api/health` → `{ ok: true }`
- `/add` → ilan ekle
- `/listings` → ilanları gör
- `/car/:id` → detay + mesaj gönder
