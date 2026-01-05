'use client'

import Link from 'next/link'

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
}

interface CafeGridProps {
    cafes: Cafe[]
    isAdmin: boolean
}

export default function CafeGrid({ cafes, isAdmin }: CafeGridProps) {

    const getNoiseIcon = (level: string) => {
        switch (level) {
            case 'tiché': return '🤫'
            case 'střední': return '🔊'
            case 'hlučné': return '📢'
            default: return '🔊'
        }
    }

    const handleDelete = async (id: number) => {
        if (confirm('Smazat tuto kavárnu?')) {
            // TODO: Implement delete
            console.log('Delete cafe', id)
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
        <div className="cafe-grid">
            {cafes.map((cafe, index) => (
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

                        {/* Address */}
                        <div className="cafe-address">📍 {cafe.address}</div>

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
                            <button className="btn btn-small btn-secondary">
                                💬 Recenze (0)
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
