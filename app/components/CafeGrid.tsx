'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useUserLocation } from '@/app/hooks/useUserLocation'

interface Cafe {
    id: number
    name: string
    address: string
    description?: string
    image_url?: string
    has_wifi: boolean
    noise_level: string
    good_for_study: boolean
    has_food: boolean
    is_specialty: boolean
    is_historic: boolean
    avg_rating?: number
    rating_count?: number
    latitude?: number
    longitude?: number
}

interface CafeGridProps {
    cafes: Cafe[]
    isAdmin: boolean
}

export default function CafeGrid({ cafes, isAdmin }: CafeGridProps) {
    const router = useRouter()
    const supabase = createClient()
    const { calculateDistance, loading: locLoading } = useUserLocation()
    const [sortBy, setSortBy] = useState<'rating' | 'distance'>('rating')

    const sortedCafes = useMemo(() => {
        let list = [...cafes]
        if (sortBy === 'distance') {
            list.sort((a, b) => {
                const distA = a.latitude && a.longitude ? parseFloat(calculateDistance(a.latitude, a.longitude) || '999999') : 999999
                const distB = b.latitude && b.longitude ? parseFloat(calculateDistance(b.latitude, b.longitude) || '999999') : 999999
                return distA - distB
            })
        }
        return list
    }, [cafes, sortBy, calculateDistance])

    const getNoiseIcon = (level: string) => {
        switch (level) {
            case 'tiché': return '🤫'
            case 'střední': return '🔊'
            case 'hlučné': return '📢'
            default: return '🔊'
        }
    }

    const handleDelete = async (id: number) => {
        if (confirm('Opravdu chcete smazat tuto kavárnu?')) {
            const { error } = await supabase
                .from('cafes')
                .delete()
                .eq('id', id)

            if (error) {
                alert('Chyba při mazání: ' + error.message)
            } else {
                router.refresh()
            }
        }
    }

    if (cafes.length === 0) {
        return (
            <div className="loading">
                😕 Žádné kavárny nenalezeny.
            </div>
        )
    }

    return (
        <div style={{ marginTop: '30px' }}>
            {/* Sorting Controls */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>Seřadit podle:</span>
                <button
                    onClick={() => setSortBy('rating')}
                    style={{
                        background: sortBy === 'rating' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontSize: '0.85em'
                    }}
                >
                    ⭐ Hodnocení
                </button>
                <button
                    onClick={() => setSortBy('distance')}
                    disabled={locLoading}
                    style={{
                        background: sortBy === 'distance' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontSize: '0.85em',
                        opacity: locLoading ? 0.5 : 1
                    }}
                >
                    📍 Vzdálenosti
                </button>
            </div>

            <div className="cafe-grid">
                {sortedCafes.map((cafe, index) => {
                    const distance = cafe.latitude && cafe.longitude ? calculateDistance(cafe.latitude, cafe.longitude) : null

                    return (
                        <div
                            key={cafe.id}
                            className="cafe-card"
                            style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                        >
                            {/* Image */}
                            <div className="cafe-image">
                                {cafe.image_url ? (
                                    <img
                                        src={cafe.image_url}
                                        alt={cafe.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    '☕'
                                )}
                            </div>

                            <div className="cafe-content">
                                {/* Header */}
                                <div className="cafe-header">
                                    <div className="cafe-name">{cafe.name}</div>
                                    {isAdmin && (
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(cafe.id)}
                                            title="Smazat"
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>

                                {/* Address & Distance */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <div className="cafe-address" style={{ marginBottom: 0 }}>📍 {cafe.address}</div>
                                    {distance && (
                                        <div style={{ color: 'var(--primary)', fontSize: '0.85em', fontWeight: 600 }}>
                                            {distance}
                                        </div>
                                    )}
                                </div>

                                {/* Rating */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <span style={{ color: 'var(--accent)', fontSize: '1.1em' }}>
                                        {'★'.repeat(Math.round(cafe.avg_rating || 0))}
                                        {'☆'.repeat(5 - Math.round(cafe.avg_rating || 0))}
                                    </span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85em' }}>
                                        {cafe.avg_rating ? cafe.avg_rating.toFixed(1) : '-'} ({cafe.rating_count || 0})
                                    </span>
                                </div>

                                {/* Tags */}
                                <div className="cafe-tags">
                                    {cafe.is_specialty && <span className="cafe-tag specialty">☕ Specialty</span>}
                                    {cafe.noise_level === 'tiché' && <span className="cafe-tag quiet">🤫 Klidné</span>}
                                    {cafe.has_food && <span className="cafe-tag food">🍰 Zákusky</span>}
                                    {cafe.is_historic && <span className="cafe-tag historic">🏛️ Historické</span>}
                                </div>

                                {/* Stats */}
                                <div className="cafe-stats">
                                    <div className="stat">
                                        <span className="stat-label">WiFi:</span>
                                        <span className="stars">{cafe.has_wifi ? '★★★★★' : '☆☆☆☆☆'}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-label">Hluk:</span>
                                        <span className="stat-value">{getNoiseIcon(cafe.noise_level)} {cafe.noise_level}</span>
                                    </div>
                                </div>

                                {/* Badge */}
                                {cafe.good_for_study && (
                                    <span className="badge">✓ Vhodné na učení</span>
                                )}

                                {/* Actions */}
                                <div className="action-buttons">
                                    <Link href={`/cafes/${cafe.id}`} className="btn btn-small">
                                        👁️ Detail
                                    </Link>
                                    <Link href={`/cafes/${cafe.id}`} className="btn btn-small btn-secondary">
                                        💬 Recenze ({cafe.rating_count || 0})
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

