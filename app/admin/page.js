'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'

const I18N = {
  fr: {
    langName: 'Français',
    title: 'Gestion des voitures',
    subtitle: 'Ajoutez, modifiez ou supprimez des voitures de votre site',
    add: 'Ajouter une voiture',
    search: 'Rechercher par nom de voiture...',
    navCars: 'Voitures',
    navLogout: 'Déconnexion',
    image: 'Image',
    name: 'Nom de la voiture',
    year: 'Année',
    fuel: 'Carburant',
    seats: 'Places',
    price: 'Prix (DH)',
    status: 'Statut',
    actions: 'Actions',
    Essence: 'Essence',
    Diesel: 'Diesel',
    Hybride: 'Hybride',
    Available: 'Disponible',
    Reserved: 'Réservée',
    dh: 'DH',
    none: 'Aucune voiture trouvée.',
    editTitle: 'Modifier la voiture',
    photo: 'Photo de la voiture',
    gallery: 'Choisir dans la galerie',
    removePhoto: 'Supprimer la photo',
    photoHint: 'JPG ou PNG',
    cancel: 'Annuler',
    save: 'Enregistrer',
    confirmDel: 'Supprimer « {name} » ?',
    logoutQ: 'Se déconnecter ?',
    logoutMsg: 'Voulez-vous vraiment vous déconnecter ?',
    loggedOut: 'Vous êtes déconnecté',
    loading: 'Chargement…',
    saving: 'Enregistrement…',
  },
  ar: {
    langName: 'العربية',
    title: 'إدارة السيارات',
    subtitle: 'أضف أو عدّل أو احذف السيارات من موقعك',
    add: 'إضافة سيارة جديدة',
    search: 'ابحث باسم السيارة...',
    navCars: 'السيارات',
    navLogout: 'تسجيل الخروج',
    image: 'الصورة',
    name: 'اسم السيارة',
    year: 'السنة',
    fuel: 'نوع الوقود',
    seats: 'المقاعد',
    price: 'السعر (درهم)',
    status: 'الحالة',
    actions: 'الإجراءات',
    Essence: 'بنزين',
    Diesel: 'ديزل',
    Hybride: 'هجين',
    Available: 'متاحة',
    Reserved: 'محجوزة',
    dh: 'درهم',
    none: 'لم يتم العثور على سيارات.',
    editTitle: 'تعديل السيارة',
    photo: 'صورة السيارة',
    gallery: 'اختيار من المعرض',
    removePhoto: 'حذف الصورة',
    photoHint: 'JPG أو PNG',
    cancel: 'إلغاء',
    save: 'حفظ',
    confirmDel: 'هل تريد حذف "{name}"؟',
    logoutQ: 'تسجيل الخروج؟',
    logoutMsg: 'هل تريد فعلا تسجيل الخروج؟',
    loggedOut: 'تم تسجيل الخروج',
    loading: 'جاري التحميل…',
    saving: 'جاري الحفظ…',
  },
}

const emptyForm = {
  name: '',
  year: 2024,
  seats: 5,
  fuel: 'Essence',
  price: 300,
  status: 'Available',
  image_url: null,
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [sessionReady, setSessionReady] = useState(false)
  const [cars, setCars] = useState([])
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('fr')
  const [langOpen, setLangOpen] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [pendingFile, setPendingFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [toast, setToast] = useState('')
  const [busy, setBusy] = useState(false)
  const [loadError, setLoadError] = useState('')

  const t = useCallback((k) => (I18N[lang] && I18N[lang][k]) || I18N.fr[k] || k, [lang])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const loadCars = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoadError('Supabase non configuré (.env.local)')
      return
    }
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (error) {
      setLoadError(error.message)
      return
    }
    setCars(data || [])
    setLoadError('')
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSessionReady(true)
      setLoadError('Supabase non configuré. Créez .env.local avec NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY puis redémarrez.')
      return
    }
    const supabase = getSupabase()

    let cancelled = false

    async function check() {
      const { data } = await supabase.auth.getSession()
      if (cancelled) return
      if (!data.session) {
        // small delay to avoid race with login redirect
        setTimeout(() => {
          if (!cancelled) router.replace('/admin/login')
        }, 200)
        return
      }
      setSessionReady(true)
      loadCars()
    }

    check()

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (cancelled) return
      if (event === 'SIGNED_OUT' || !session) {
        router.replace('/admin/login')
      } else if (event === 'SIGNED_IN' && session) {
        setSessionReady(true)
        loadCars()
      }
    })

    return () => {
      cancelled = true
      sub?.subscription?.unsubscribe()
    }
  }, [router, loadCars])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return cars
    return cars.filter((c) => (c.name || '').toLowerCase().includes(s))
  }, [cars, q])

  function openAdd() {
    setEditId(null)
    setForm(emptyForm)
    setPendingFile(null)
    setPreview(null)
    setModalOpen(true)
  }

  function openEdit(car) {
    setEditId(car.id)
    setForm({
      name: car.name || '',
      year: car.year || 2024,
      seats: car.seats || 5,
      fuel: car.fuel || 'Essence',
      price: car.price || 0,
      status: car.status || 'Available',
      image_url: car.image_url || null,
    })
    setPendingFile(null)
    setPreview(car.image_url || null)
    setModalOpen(true)
  }

  function onPickFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    setPendingFile(file)
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  async function uploadImage(file, carId) {
    const supabase = getSupabase()
    const ext = file.name.split('.').pop() || 'jpg'
    const path = `${carId}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('cars').upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    })
    if (error) throw error
    const { data } = supabase.storage.from('cars').getPublicUrl(path)
    return data.publicUrl
  }

  async function saveCar() {
    const name = form.name.trim()
    if (!name) return
    setBusy(true)
    try {
      const supabase = getSupabase()
      const payload = {
        name,
        year: Number(form.year) || 2024,
        seats: Number(form.seats) || 5,
        fuel: form.fuel,
        price: Number(form.price) || 0,
        status: form.status,
      }

      if (editId) {
        let image_url = form.image_url
        if (pendingFile) {
          image_url = await uploadImage(pendingFile, editId)
        }
        const { error } = await supabase
          .from('cars')
          .update({ ...payload, image_url })
          .eq('id', editId)
        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('cars')
          .insert(payload)
          .select('id')
          .single()
        if (error) throw error
        if (pendingFile && data?.id) {
          const image_url = await uploadImage(pendingFile, data.id)
          await supabase.from('cars').update({ image_url }).eq('id', data.id)
        }
      }
      setModalOpen(false)
      await loadCars()
      showToast(lang === 'ar' ? 'تم الحفظ' : 'Enregistré')
    } catch (err) {
      showToast(err.message || 'Erreur')
    } finally {
      setBusy(false)
    }
  }

  async function deleteCar(car) {
    const msg = t('confirmDel').replace('{name}', car.name)
    if (!window.confirm(msg)) return
    try {
      const supabase = getSupabase()
      const { error } = await supabase.from('cars').delete().eq('id', car.id)
      if (error) throw error
      await loadCars()
    } catch (err) {
      showToast(err.message || 'Erreur')
    }
  }

  async function logout() {
    setConfirmOpen(false)
    if (isSupabaseConfigured) {
      await getSupabase().auth.signOut()
    }
    showToast(t('loggedOut'))
    router.replace('/admin/login')
  }

  if (!sessionReady) {
    return <div className="loading-screen">{t('loading')}</div>
  }

  return (
    <>
      <aside className={`sidebar${drawer ? ' open' : ''}`} id="sidebar">
        <div className="logo">
          <img src="/images/logo.png" alt="Mamou Sahara" />
        </div>
        <nav className="nav">
          <a href="/admin" className="active" aria-current="page">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h1a2 2 0 0 1 2 2v5h-2a2 2 0 1 1-4 0H8a2 2 0 1 1-4 0H2v-5a2 2 0 0 1 2-2h1zm3.2-4l-1 3h9.6l-1-3H8.2z" />
            </svg>
            <span>{t('navCars')}</span>
          </a>
          <button type="button" className="nav-link" onClick={() => setConfirmOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5M21 12H9" />
            </svg>
            <span>{t('navLogout')}</span>
          </button>
        </nav>
      </aside>
      <div className={`scrim${drawer ? ' show' : ''}`} onClick={() => setDrawer(false)} />

      <div className="main">
        <header className="topbar">
          <button className="burger" type="button" aria-label="Menu" onClick={() => setDrawer((v) => !v)}>
            <span /><span /><span />
          </button>
          <div className="lang">
            <button
              type="button"
              className="lang-btn"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              {I18N[lang].langName}
            </button>
            {langOpen && (
              <ul className="lang-menu">
                {['fr', 'ar'].map((l) => (
                  <li key={l}>
                    <button
                      type="button"
                      className={l === lang ? 'on' : ''}
                      onClick={() => {
                        setLang(l)
                        setLangOpen(false)
                      }}
                    >
                      {I18N[l].langName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        <main className="content">
          <div className="page-head">
            <div className="title-wrap">
              <div>
                <h1>{t('title')}</h1>
                <p>{t('subtitle')}</p>
              </div>
            </div>
            <button className="btn-add" type="button" onClick={openAdd}>
              + {t('add')}
            </button>
          </div>

          {loadError ? <p className="err" style={{ marginBottom: 16 }}>{loadError}</p> : null}

          <section className="card">
            <div className="filters">
              <label className="field search">
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t('search')}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{t('image')}</th>
                    <th className="start">{t('name')}</th>
                    <th>{t('year')}</th>
                    <th>{t('fuel')}</th>
                    <th>{t('seats')}</th>
                    <th>{t('price')}</th>
                    <th>{t('status')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td className="empty" colSpan={8}>{t('none')}</td>
                    </tr>
                  ) : (
                    filtered.map((c) => (
                      <tr key={c.id}>
                        <td className="img">
                          {c.image_url ? (
                            <img className="photo" src={c.image_url} alt={c.name} />
                          ) : (
                            <span style={{ opacity: 0.4 }}>—</span>
                          )}
                        </td>
                        <td className="name" data-label={t('name')}>{c.name}</td>
                        <td data-label={t('year')}>{c.year}</td>
                        <td data-label={t('fuel')}>
                          <span className={`badge ${(c.fuel || '').toLowerCase()}`}>{t(c.fuel)}</span>
                        </td>
                        <td data-label={t('seats')}>{c.seats}</td>
                        <td className="price" data-label={t('price')}>{c.price} {t('dh')}</td>
                        <td data-label={t('status')}>
                          <span className={`status ${(c.status || '').toLowerCase()}`}>{t(c.status)}</span>
                        </td>
                        <td className="actions-cell" data-label={t('actions')}>
                          <div className="actions">
                            <button type="button" className="ic edit" onClick={() => openEdit(c)} aria-label="Edit">✎</button>
                            <button type="button" className="ic del" onClick={() => deleteCar(c)} aria-label="Delete">🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Add / Edit modal */}
      <div className={`modal${modalOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <div className="box">
          <h2>{editId ? t('editTitle') : t('add')}</h2>
          <label>{t('name')}</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="ex. Dacia Logan"
          />
          <div className="row2">
            <div>
              <label>{t('year')}</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              />
            </div>
            <div>
              <label>{t('seats')}</label>
              <input
                type="number"
                value={form.seats}
                onChange={(e) => setForm((f) => ({ ...f, seats: e.target.value }))}
              />
            </div>
          </div>
          <div className="row2">
            <div>
              <label>{t('fuel')}</label>
              <select
                value={form.fuel}
                onChange={(e) => setForm((f) => ({ ...f, fuel: e.target.value }))}
              >
                <option value="Essence">{t('Essence')}</option>
                <option value="Diesel">{t('Diesel')}</option>
                <option value="Hybride">{t('Hybride')}</option>
              </select>
            </div>
            <div>
              <label>{t('price')}</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              />
            </div>
          </div>
          <label>{t('status')}</label>
          <select
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          >
            <option value="Available">{t('Available')}</option>
            <option value="Reserved">{t('Reserved')}</option>
          </select>
          <label>{t('photo')}</label>
          <div className="upload">
            <div className="prev">
              {preview ? <img src={preview} alt="" /> : null}
            </div>
            <div className="upload-btns">
              <label style={{ cursor: 'pointer' }}>
                <span style={{
                  display: 'inline-flex',
                  minHeight: 44,
                  padding: '0 16px',
                  borderRadius: 8,
                  background: '#e1ebfd',
                  color: '#1850c8',
                  fontWeight: 600,
                  fontSize: 15,
                  alignItems: 'center',
                }}
                >
                  {t('gallery')}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => onPickFile(e.target.files?.[0])}
                />
              </label>
              {preview && (
                <button
                  type="button"
                  className="b-rm"
                  onClick={() => {
                    setPendingFile(null)
                    setPreview(null)
                    setForm((f) => ({ ...f, image_url: null }))
                  }}
                >
                  {t('removePhoto')}
                </button>
              )}
            </div>
          </div>
          <span className="hint">{t('photoHint')}</span>
          <div className="btns">
            <button type="button" className="b-cancel" onClick={() => setModalOpen(false)}>{t('cancel')}</button>
            <button type="button" className="b-save" onClick={saveCar} disabled={busy}>
              {busy ? t('saving') : t('save')}
            </button>
          </div>
        </div>
      </div>

      {/* Logout confirm */}
      <div className={`modal${confirmOpen ? ' open' : ''}`} role="alertdialog">
        <div className="box confirm">
          <h2>{t('logoutQ')}</h2>
          <p>{t('logoutMsg')}</p>
          <div className="btns">
            <button type="button" className="b-cancel" onClick={() => setConfirmOpen(false)}>{t('cancel')}</button>
            <button type="button" className="b-danger" onClick={logout}>{t('navLogout')}</button>
          </div>
        </div>
      </div>

      <div className={`toast${toast ? ' show' : ''}`}>{toast}</div>
    </>
  )
}
