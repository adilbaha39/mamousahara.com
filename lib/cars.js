import { createClient } from '@supabase/supabase-js'

function formatPrice(n) {
  const num = Number(n) || 0
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

/** Normalize a DB row for UI cards */
export function mapCar(row) {
  const transmission = row.transmission || 'Auto'
  const seats = row.seats || 5
  const fuel = row.fuel || 'Essence'
  return {
    id: row.id,
    name: row.name,
    year: String(row.year || ''),
    price: Number(row.price) || 0,
    priceDisplay: formatPrice(row.price),
    image: row.image_url || '/images/hero-vehicules.webp',
    badge: row.badge || fuel || 'Auto',
    status: row.status || 'Available',
    specs: [transmission, `${seats}`, fuel],
    fuel,
    seats,
    transmission,
  }
}

/**
 * Fetch cars from Supabase only (no static fallback).
 * Returns [] if not configured, on error, or when empty.
 */
export async function getCars({ all = false, limit } = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('[getCars] Supabase not configured – returning empty list')
    return []
  }

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    let query = supabase
      .from('cars')
      .select('id,name,year,fuel,seats,price,status,image_url,badge,transmission,sort_order')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (!all) {
      query = query.eq('status', 'Available')
    }
    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
    if (error) {
      console.error('[getCars]', error.message)
      return []
    }
    return (data || []).map(mapCar)
  } catch (err) {
    console.error('[getCars]', err.message || err)
    return []
  }
}
