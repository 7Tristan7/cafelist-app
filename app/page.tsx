import { createClient } from '@/utils/supabase/server'
import CafeGrid from './components/CafeGrid'
import CafeMap from './components/CafeMap'
import CafeFilters from './components/CafeFilters'
import Header from './components/Header'

interface PageProps {
  searchParams: Promise<{ search?: string; tag?: string }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const supabase = await createClient()

  // Načteme kavárny s hodnocením (view)
  let query = supabase.from('cafes_with_ratings').select('*')

  // Filtr podle vyhledávání
  if (params.search) {
    query = query.or(`name.ilike.%${params.search}%,address.ilike.%${params.search}%`)
  }

  // Filtr podle tagu
  if (params.tag) {
    switch (params.tag) {
      case 'specialty':
        query = query.eq('is_specialty', true)
        break
      case 'quiet':
        query = query.eq('noise_level', 'tiché')
        break
      case 'food':
        query = query.eq('has_food', true)
        break
      case 'historic':
        query = query.eq('is_historic', true)
        break
    }
  }

  const { data: cafes } = await query

  // Načteme všechny kavárny pro statistiky
  const { data: allCafes } = await supabase.from('cafes_with_ratings').select('*')

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

  // Statistiky (z všech kaváren)
  const totalCafes = allCafes?.length || 0
  const studyFriendly = allCafes?.filter(c => c.good_for_study).length || 0
  const quietCafes = allCafes?.filter(c => c.noise_level === 'tiché').length || 0
  const totalRatings = allCafes?.reduce((sum, c) => sum + (c.rating_count || 0), 0) || 0

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
            <div className="number">{totalRatings}</div>
            <div className="label">Recenzí celkem</div>
          </div>
        </div>

        {/* Filters */}
        <CafeFilters isAdmin={profile?.role === 'admin'} />

        {/* Map */}
        <CafeMap cafes={cafes || []} />

        {/* Cafe Grid */}
        <CafeGrid cafes={cafes || []} isAdmin={profile?.role === 'admin'} />
      </div>
    </>
  )
}
