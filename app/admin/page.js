'use client'

import { useCallback, useEffect, useState } from 'react'
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
    cancel: 'Annuler',
    save: 'Enregistrer',
    confirmDel: 'Supprimer « {name} » ?',
    logoutQ: 'Se déconnecter ?',
    logoutMsg: 'Voulez-vous vraiment vous déconnecter ?',
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
    cancel: 'إلغاء',
    save: 'حفظ',
    confirmDel: 'هل تريد حذف "{name}"؟',
    logoutQ: 'تسجيل الخروج؟',
    logoutMsg: 'هل تريد فعلا تسجيل الخروج؟',
  },
}

const emptyForm = { name: '', year: 2024, seats: 5, fuel: 'Essence', price: 300, status: 'Available', image_url: null }

export default function AdminDashboardPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [cars, setCars] = useState([])
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('fr')
  const [langOpen, setLangOpen] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [toast, setToast] = useState('')
  const [error, setError] = useState('')

  const t = (k) => I18N[lang]?.[k] || I18N.fr[k] || k

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
      setError('Supabase غير مُعد')
      return
    }
    const supabase = getSupabase()
    const { data, error: err } = await supabase.from('cars').select('*').order('created_at', { ascending: false })
    if (err) setError(err.message)
    else setCars(data || [])
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setReady(true)
      setError('Supabase غير مُعد')
      return
    }
    const supabase = getSupabase()
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/admin/login')
      else {
        setReady(true)
        loadCars()
      }
    })
  }, [router, loadCars])

  const filtered = cars.filter((c) => c.name?.toLowerCase().includes(q.toLowerCase()))

  function openAdd() {
    setEditId(null)
    setForm(emptyForm)
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
    setModalOpen(true)
  }

  async function saveCar() {
    if (!form.name.trim()) return
    const supabase = getSupabase()
    const payload = {
      name: form.name.trim(),
      year: Number(form.year) || 2024,
      seats: Number(form.seats) || 5,
      fuel: form.fuel,
      price: Number(form.price) || 0,
      status: form.status,
    }
    try {
      if (editId) {
        const { error: err } = await supabase.from('cars').update(payload).eq('id', editId)
        if (err) throw err
      } else {
        const { error: err } = await supabase.from('cars').insert(payload)
        if (err) throw err
      }
      setModalOpen(false)
      await loadCars()
      showToast(lang === 'ar' ? 'تم الحفظ' : 'Enregistré')
    } catch (err) {
      showToast(err.message || 'Erreur')
    }
  }

  async function deleteCar(car) {
    if (!confirm(t('confirmDel').replace('{name}', car.name))) return
    const supabase = getSupabase()
    const { error: err } = await supabase.from('cars').delete().eq('id', car.id)
    if (err) showToast(err.message)
    else {
      await loadCars()
      showToast(lang === 'ar' ? 'تم الحذف' : 'Supprimé')
    }
  }

  async function logout() {
    const supabase = getSupabase()
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (!ready) return <div style={{ padding: 40, textAlign: 'center' }}>Chargement…</div>

  return (
    <>
      <aside className={`sidebar${drawer ? ' open' : ''}`}>
        <div className="logo">
          <svg width="142" height="52" viewBox="0 0 142 52" fill="none" stroke="#fff" strokeWidth="2.6">
            <path d="M3 38c0-6 3-9 9-10l14-3 14-14c3-3 6-4 12-4h22c8 0 14 2 20 8l14 10 9 4c3 1 4 3 4 6v3" />
            <path d="M40 11l-4 12M96 12l-6 14M52 11h40" />
            <path d="M3 38h8M40 38h56M124 38h8" />
            <path d="M12 38a12 12 0 0 1 24 0" />
            <path d="M100 38a12 12 0 0 1 24 0" />
          </svg>
        </div>
        <nav className="nav">
          <a href="#" className="active">{t('navCars')}</a>
          <button className="nav-link" onClick={logout}>{t('navLogout')}</button>
        </nav>
      </aside>
      <div className={`scrim${drawer ? ' show' : ''}`} onClick={() => setDrawer(false)} />

      <div className="main">
        <header className="topbar">
          <button className="burger" onClick={() => setDrawer((v) => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
          <div className="lang">
            <button className="lang-btn" onClick={() => setLangOpen((v) => !v)}>
              {I18N[lang].langName}
            </button>
            {langOpen && (
              <ul className="lang-menu">
                {['fr', 'ar'].map((l) => (
                  <li key={l}>
                    <button className={l === lang ? 'on' : ''} onClick={() => { setLang(l); setLangOpen(false) }}>
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
            <button className="btn-add" onClick={openAdd}>+ {t('add')}</button>
          </div>

          {error && <p className="err">{error}</p>}

          <section className="card">
            <div className="filters">
              <label className="field search">
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search')} />
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
                    <tr><td className="empty" colSpan={8}>{t('none')}</td></tr>
                  ) : (
                    filtered.map((car) => (
                      <tr key={car.id}>
                        <td className="img">
                          {car.image_url ? <img className="photo" src={car.image_url} alt="" style={{ width: 120, height: 50, objectFit: 'cover', borderRadius: 8 }} /> : '🚗'}
                        </td>
                        <td className="name">{car.name}</td>
                        <td>{car.year}</td>
                        <td><span className="badge">{t(car.fuel)}</span></td>
                        <td>{car.seats}</td>
                        <td className="price">{car.price} {t('dh')}</td>
                        <td><span className={`status ${car.status?.toLowerCase()}`}>{t(car.status)}</span></td>
                        <td>
                          <div className="actions">
                            <button className="ic edit" onClick={() => openEdit(car)}>✏️</button>
                            <button className="ic del" onClick={() => deleteCar(car)}>🗑️</button>
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

      {modalOpen && (
        <div className="modal open" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="box">
            <h2>{editId ? t('editTitle') : t('add')}</h2>
            <label>{t('name')}</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <div className="row2">
              <div>
                <label>{t('year')}</label>
                <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
              </div>
              <div>
                <label>{t('seats')}</label>
                <input type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} />
              </div>
            </div>
            <label>{t('fuel')}</label>
            <select value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })}>
              <option value="Essence">{t('Essence')}</option>
              <option value="Diesel">{t('Diesel')}</option>
              <option value="Hybride">{t('Hybride')}</option>
            </select>
            <label>{t('price')}</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <label>{t('status')}</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="Available">{t('Available')}</option>
              <option value="Reserved">{t('Reserved')}</option>
            </select>
            <div className="btns">
              <button className="b-cancel" onClick={() => setModalOpen(false)}>{t('cancel')}</button>
              <button className="b-save" onClick={saveCar}>{t('save')}</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast show">{toast}</div>}
    </>
  )
}
