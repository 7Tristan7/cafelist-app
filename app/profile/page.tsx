import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Načteme profil
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Načteme oblíbené kavárny
    const { data: favorites } = await supabase
        .from('favorites')
        .select(`
            id,
            cafe:cafes(id, name, address)
        `)
        .eq('user_id', user.id)

    // Načteme recenze uživatele
    const { data: reviews } = await supabase
        .from('reviews')
        .select(`
            id,
            rating,
            text,
            created_at,
            cafe:cafes(id, name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <>
            <ul className="bg-bubbles">
                <li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li>
            </ul>

            <div className="container" style={{ maxWidth: '800px', marginTop: '40px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none' }}>
                        ← Zpět na seznam
                    </Link>
                    <form action="/auth/signout" method="post">
                        <button type="submit" className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                            🚪 Odhlásit
                        </button>
                    </form>
                </div>

                {/* Profile Card */}
                <div className="glass-card" style={{ padding: '30px', marginBottom: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(145deg, var(--primary), var(--primary-dark))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '36px'
                        }}>
                            👤
                        </div>
                        <div>
                            <h1 style={{ margin: 0 }}>{profile?.name || 'Uživatel'}</h1>
                            <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0' }}>{user.email}</p>
                            {profile?.role === 'admin' && (
                                <span className="tag" style={{ marginTop: '8px', display: 'inline-block' }}>
                                    🛡️ Admin
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="glass-card statistics" style={{ marginBottom: '25px' }}>
                    <div className="stat-card">
                        <div className="number">{favorites?.length || 0}</div>
                        <div className="label">Oblíbených</div>
                    </div>
                    <div className="stat-card">
                        <div className="number">{reviews?.length || 0}</div>
                        <div className="label">Recenzí</div>
                    </div>
                </div>

                {/* Favorites */}
                <div className="glass-card" style={{ padding: '25px', marginBottom: '25px' }}>
                    <h2 style={{ marginTop: 0 }}>❤️ Oblíbené kavárny</h2>
                    {favorites && favorites.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {favorites.map((fav: any) => (
                                <Link
                                    key={fav.id}
                                    href={`/cafes/${fav.cafe?.id}`}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '15px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        color: 'var(--text)',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <div>
                                        <strong>{fav.cafe?.name}</strong>
                                        <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9em' }}>
                                            {fav.cafe?.address}
                                        </p>
                                    </div>
                                    <span>→</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-muted)' }}>
                            Zatím nemáte žádné oblíbené kavárny. Klikněte na ❤️ u kavárny pro přidání.
                        </p>
                    )}
                </div>

                {/* Reviews */}
                <div className="glass-card" style={{ padding: '25px' }}>
                    <h2 style={{ marginTop: 0 }}>⭐ Vaše recenze</h2>
                    {reviews && reviews.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {reviews.map((review: any) => (
                                <div
                                    key={review.id}
                                    style={{
                                        padding: '15px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '10px'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Link
                                            href={`/cafes/${review.cafe?.id}`}
                                            style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
                                        >
                                            {review.cafe?.name}
                                        </Link>
                                        <div style={{ color: '#fbbf24' }}>
                                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                        </div>
                                    </div>
                                    {review.text && (
                                        <p style={{ margin: '10px 0 0 0', color: 'var(--text-muted)' }}>
                                            "{review.text}"
                                        </p>
                                    )}
                                    <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: '0.8em' }}>
                                        {new Date(review.created_at).toLocaleDateString('cs-CZ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-muted)' }}>
                            Zatím jste nenapsali žádnou recenzi. Navštivte kavárnu a podělte se o svůj názor!
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}
