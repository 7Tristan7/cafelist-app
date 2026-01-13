import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StarRating from '../../components/StarRating'
import OpeningHours from '../../components/OpeningHours'
import FavoriteButton from '../../components/FavoriteButton'
import PhotoGallery from '../../components/PhotoGallery'
import ReviewForm from '../../components/ReviewForm'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function CafeDetailPage({ params }: PageProps) {
    const { id } = await params
    const supabase = await createClient()

    // Načteme kavárnu
    const { data: cafe, error } = await supabase
        .from('cafes')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !cafe) {
        notFound()
    }

    // Načteme uživatele
    const { data: { user } } = await supabase.auth.getUser()

    // Profil uživatele (pro admin check)
    let profile = null
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
        profile = data
    }
    const isAdmin = profile?.role === 'admin'

    // Načteme hodnocení
    const { data: ratings } = await supabase
        .from('ratings')
        .select('*, profiles(username)')
        .eq('cafe_id', id)
        .order('created_at', { ascending: false })

    // Spočítáme průměr
    const avgRating = ratings && ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
        : 0

    // Zjistíme, jestli user už hodnotil
    const userRating = user
        ? ratings?.find(r => r.user_id === user.id)?.stars
        : undefined

    const getNoiseIcon = (level: string) => {
        switch (level) {
            case 'tiché': return '🤫'
            case 'střední': return '🔊'
            case 'hlučné': return '📢'
            default: return '🔊'
        }
    }

    return (
        <>
            <ul className="bg-bubbles">
                <li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li>
            </ul>

            <div className="container" style={{ maxWidth: '800px', paddingTop: '40px' }}>
                {/* Back button */}
                <Link
                    href="/"
                    style={{
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '20px'
                    }}
                >
                    ← Zpět na seznam
                </Link>

                {/* Main Card */}
                <div className="glass-card" style={{ padding: '35px' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div>
                            <h1 style={{ color: 'var(--text)', fontSize: '2em', marginBottom: '8px' }}>
                                ☕ {cafe.name}
                            </h1>
                            <p style={{ color: 'var(--text-muted)' }}>📍 {cafe.address}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <FavoriteButton cafeId={cafe.id} userId={user?.id} />
                            <StarRating
                                cafeId={cafe.id}
                                avgRating={avgRating}
                                ratingCount={ratings?.length || 0}
                                readOnly={true}
                                size="large"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    {cafe.description && (
                        <p style={{ color: 'var(--text)', opacity: 0.9, marginBottom: '25px', lineHeight: 1.6 }}>
                            {cafe.description}
                        </p>
                    )}

                    {/* Tags */}
                    <div className="cafe-tags" style={{ marginBottom: '25px' }}>
                        {cafe.is_specialty && <span className="cafe-tag specialty">☕ Specialty</span>}
                        {cafe.noise_level === 'tiché' && <span className="cafe-tag quiet">🤫 Klidné</span>}
                        {cafe.has_food && <span className="cafe-tag food">🍰 Zákusky</span>}
                        {cafe.is_historic && <span className="cafe-tag historic">🏛️ Historické</span>}
                    </div>

                    {/* Stats */}
                    <div className="cafe-stats" style={{ marginBottom: '25px' }}>
                        <div className="stat">
                            <span className="stat-label">WiFi:</span>
                            <span className="stars">{cafe.has_wifi ? '★★★★★' : '☆☆☆☆☆'}</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Hluk:</span>
                            <span className="stat-value">{getNoiseIcon(cafe.noise_level)} {cafe.noise_level}</span>
                        </div>
                    </div>

                    {cafe.good_for_study && (
                        <span className="badge">✓ Vhodné na učení</span>
                    )}

                    {/* Admin Actions */}
                    {isAdmin && (
                        <div className="action-buttons" style={{ marginTop: '20px' }}>
                            <Link href={`/cafes/${cafe.id}/edit`} className="btn btn-small">
                                ✏️ Upravit kavárnu
                            </Link>
                        </div>
                    )}
                </div>

                {/* Opening Hours & Gallery Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <OpeningHours hours={cafe.opening_hours} />
                    <PhotoGallery cafeId={cafe.id} photos={cafe.photos || []} isAdmin={isAdmin} />
                </div>

                {/* Rating Section */}
                <ReviewForm
                    cafeId={cafe.id}
                    userId={user?.id}
                    existingReview={userRating ? { id: ratings?.find(r => r.user_id === user?.id)?.id, rating: userRating, text: ratings?.find(r => r.user_id === user?.id)?.comment || '' } : undefined}
                />

                <div className="glass-card" style={{ padding: '30px', marginTop: '25px' }}>
                    <h2 style={{ color: 'var(--text)', marginBottom: '20px' }}>💬 Komentáře ({ratings?.length || 0})</h2>

                    {ratings && ratings.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {ratings.map((rating) => (
                                <div
                                    key={rating.id}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '18px',
                                        borderRadius: '12px'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ color: 'var(--text)', fontWeight: 600 }}>
                                            {(rating.profiles as any)?.username || 'Anonym'}
                                        </span>
                                        <span style={{ color: 'var(--accent)' }}>
                                            {'★'.repeat(rating.stars)}{'☆'.repeat(5 - rating.stars)}
                                        </span>
                                    </div>
                                    {rating.comment && (
                                        <p style={{ color: 'var(--text)', opacity: 0.8 }}>{rating.comment}</p>
                                    )}
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8em' }}>
                                        {new Date(rating.created_at).toLocaleDateString('cs-CZ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px' }}>
                            Zatím žádná hodnocení. Buďte první!
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}
