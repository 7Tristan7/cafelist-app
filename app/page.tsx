import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import CafeGrid from './components/CafeGrid'
import Header from './components/Header'

export default async function Home() {
  const supabase = await createClient()

  // Načteme kavárny
  const { data: cafes } = await supabase.from('cafes').select('*')

  // Načteme uživatele
  const { data: { user } } = await supabase.auth.getUser()

  // Profil uživatele
  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  // Statistiky
  const totalCafes = cafes?.length || 0
  const studyFriendly = cafes?.filter(c => c.good_for_study).length || 0
  const quietCafes = cafes?.filter(c => c.noise_level === 'tiché').length || 0

  return (
    <>
      {/* Background Bubbles */}
      <ul className="bg-bubbles">
        <li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li>
      </ul>

      <div className="container">
        {/* Header */}
        <Header user={user} profile={profile} />

        {/* Hero Header */}
        <header className="glass-card header">
          <h1>☕ CaféList</h1>
          <p className="subtitle">Najdi tu nejlepší kavárnu v Hradci Králové</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '25px', flexWrap: 'wrap' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95em' }}>
              <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1em' }}>{totalCafes}</span> kaváren
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95em' }}>
              <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1em' }}>📍</span> Hradec Králové
            </div>
          </div>
        </header>

        {/* Statistics */}
        <div className="glass-card statistics">
          <div className="stat-card">
            <div className="number">{totalCafes}</div>
            <div className="label">Celkem kaváren</div>
          </div>
          <div className="stat-card">
            <div className="number">{studyFriendly}</div>
            <div className="label">Vhodné na učení</div>
          </div>
          <div className="stat-card">
            <div className="number">{quietCafes}</div>
            <div className="label">Klidné prostředí</div>
          </div>
          <div className="stat-card">
            <div className="number">0</div>
            <div className="label">Recenzí celkem</div>
          </div>
        </div>

        {/* Controls */}
        <div className="glass-card controls">
          {/* Tags Filter */}
          <div className="tags-filter">
            <button className="tag-btn active">Všechny</button>
            <button className="tag-btn">☕ Specialty</button>
            <button className="tag-btn">🤫 Klidné</button>
            <button className="tag-btn">🍰 Zákusky</button>
            <button className="tag-btn">🏛️ Historické</button>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            {profile?.role === 'admin' && (
              <Link href="/cafes/new" className="btn">
                ➕ Přidat kavárnu
              </Link>
            )}
            <button className="btn btn-secondary">📥 Import CSV</button>
            <button className="btn btn-secondary">📤 Export</button>
          </div>
        </div>

        {/* Cafe Grid */}
        <CafeGrid cafes={cafes || []} isAdmin={profile?.role === 'admin'} />
      </div>
    </>
  )
}
