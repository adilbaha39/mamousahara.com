import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(url && anon)

/** Browser / client-side Supabase client */
export function createBrowserClient() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }
  return createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
}

/** Singleton for client components */
let browserClient
export function getSupabase() {
  if (typeof window === 'undefined') {
    return createClient(url, anon)
  }
  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
}
