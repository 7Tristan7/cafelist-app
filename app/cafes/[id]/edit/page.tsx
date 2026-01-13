'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
    params: Promise<{ id: string }>
}

export default function EditCafePage({ params }: PageProps) {
    const [cafeId, setCafeId] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        description: '',
        image_url: '',
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: false,
        is_specialty: false,
        is_historic: false,
        latitude: '',
        longitude: ''
    })

    useEffect(() => {
        const loadCafe = async () => {
            const { id } = await params
            setCafeId(id)

            const { data: cafe, error } = await supabase
                .from('cafes')
                .select('*')
                .eq('id', id)
                .single()

            if (error || !cafe) {
                setError('Kavárna nenalezena')
                setLoading(false)
                return
            }

            setFormData({
                name: cafe.name || '',
                address: cafe.address || '',
                description: cafe.description || '',
                image_url: cafe.image_url || '',
                has_wifi: cafe.has_wifi || false,
                noise_level: cafe.noise_level || 'střední',
                good_for_study: cafe.good_for_study || false,
                has_food: cafe.has_food || false,
                is_specialty: cafe.is_specialty || false,
                is_historic: cafe.is_historic || false,
                latitude: cafe.latitude?.toString() || '',
                longitude: cafe.longitude?.toString() || ''
            })
            setLoading(false)
        }

        loadCafe()
    }, [params, supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError(null)

        const { error: updateError } = await supabase
            .from('cafes')
            .update({
                name: formData.name,
                address: formData.address,
                description: formData.description || null,
                image_url: formData.image_url || null,
                has_wifi: formData.has_wifi,
                noise_level: formData.noise_level,
                good_for_study: formData.good_for_study,
                has_food: formData.has_food,
                is_specialty: formData.is_specialty,
                is_historic: formData.is_historic,
                latitude: formData.latitude ? parseFloat(formData.latitude) : null,
                longitude: formData.longitude ? parseFloat(formData.longitude) : null
            })
            .eq('id', cafeId)

        if (updateError) {
            setError(updateError.message)
            setSaving(false)
        } else {
            router.push(`/cafes/${cafeId}`)
            router.refresh()
        }
    }

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
                <div className="loading-spinner"></div>
                <p style={{ color: 'var(--text-muted)' }}>Načítám kavárnu...</p>
            </div>
        )
    }

    if (error && !formData.name) {
        return (
            <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
                <p style={{ color: 'var(--danger)' }}>{error}</p>
                <Link href="/" className="btn" style={{ marginTop: '20px' }}>Zpět na hlavní stránku</Link>
            </div>
        )
    }

    return (
        <>
            <ul className="bg-bubbles">
                <li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li>
            </ul>

            <div className="container" style={{ maxWidth: '600px', paddingTop: '40px' }}>
                <div className="glass-card" style={{ padding: '35px' }}>
                    <Link href={`/cafes/${cafeId}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
                        ← Zpět na detail
                    </Link>

                    <h2 style={{ color: 'var(--text)', marginBottom: '25px', fontSize: '1.8em' }}>
                        ✏️ Upravit kavárnu
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Název kavárny *</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Např. Kavárna U Kocoura"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Adresa *</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Např. Velké náměstí 123, Hradec Králové"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Popis</label>
                            <textarea
                                className="form-input"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Popište kavárnu..."
                            />
                        </div>

                        <div className="form-group">
                            <label>URL fotky</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="form-group">
                            <label>Hlučnost</label>
                            <select
                                className="form-input"
                                value={formData.noise_level}
                                onChange={(e) => setFormData({ ...formData, noise_level: e.target.value })}
                            >
                                <option value="tiché">🤫 Tiché</option>
                                <option value="střední">🔊 Střední</option>
                                <option value="hlučné">📢 Hlučné</option>
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                            <label className="checkbox-group">
                                <input
                                    type="checkbox"
                                    checked={formData.has_wifi}
                                    onChange={(e) => setFormData({ ...formData, has_wifi: e.target.checked })}
                                />
                                📶 WiFi
                            </label>

                            <label className="checkbox-group">
                                <input
                                    type="checkbox"
                                    checked={formData.good_for_study}
                                    onChange={(e) => setFormData({ ...formData, good_for_study: e.target.checked })}
                                />
                                📚 Vhodné na učení
                            </label>

                            <label className="checkbox-group">
                                <input
                                    type="checkbox"
                                    checked={formData.has_food}
                                    onChange={(e) => setFormData({ ...formData, has_food: e.target.checked })}
                                />
                                🍰 Jídlo/Zákusky
                            </label>

                            <label className="checkbox-group">
                                <input
                                    type="checkbox"
                                    checked={formData.is_specialty}
                                    onChange={(e) => setFormData({ ...formData, is_specialty: e.target.checked })}
                                />
                                ☕ Specialty káva
                            </label>

                            <label className="checkbox-group">
                                <input
                                    type="checkbox"
                                    checked={formData.is_historic}
                                    onChange={(e) => setFormData({ ...formData, is_historic: e.target.checked })}
                                />
                                🏛️ Historická
                            </label>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div className="form-group">
                                <label>Zeměpisná šířka</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.latitude}
                                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                    placeholder="50.2092"
                                />
                            </div>

                            <div className="form-group">
                                <label>Zeměpisná délka</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.longitude}
                                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                    placeholder="15.8328"
                                />
                            </div>
                        </div>

                        {error && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.2)',
                                border: '1px solid rgba(239, 68, 68, 0.5)',
                                color: '#fca5a5',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                fontSize: '0.9em'
                            }}>
                                {error}
                            </div>
                        )}

                        <div className="action-buttons">
                            <button type="submit" className="btn" disabled={saving}>
                                {saving ? 'Ukládám...' : '✓ Uložit změny'}
                            </button>
                            <Link href={`/cafes/${cafeId}`} className="btn btn-secondary">
                                Zrušit
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
