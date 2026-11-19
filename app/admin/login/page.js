'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setChecking(false)
      setError('Supabase non configuré. Vérifiez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local puis redémarrez le serveur.')
      return
    }

    const supabase = getSupabase()
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace('/admin')
      } else {
        setChecking(false)
      }
    }).catch(() => setChecking(false))
  }, [router])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = getSupabase()
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (err) {
        const msg = err.message === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect.'
          : err.message
        setError(msg)
        setLoading(false)
        return
      }

      // Wait a moment for session to be fully stored, then redirect
      if (data.session) {
        setTimeout(() => {
          router.replace('/admin')
          router.refresh()
        }, 300)
      } else {
        setError('Connexion réussie mais session non créée. Réessayez.')
        setLoading(false)
      }
    } catch (err) {
      setError(err.message || 'Erreur de connexion')
      setLoading(false)
    }
  }

  if (checking) {
    return <div className="loading-screen">Chargement…</div>
  }

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={onSubmit}>
        <h1>Mamou Sahara</h1>
        <p>Connexion administrateur – gestion des voitures</p>
        {error ? <div className="err">{error}</div> : null}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mamousahara.com@gmail.com"
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <button className="btn-login" type="submit" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
