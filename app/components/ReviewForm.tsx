'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface ReviewFormProps {
    cafeId: number
    userId?: string
    existingReview?: {
        id: string
        rating: number
        text: string
    }
}

export default function ReviewForm({ cafeId, userId, existingReview }: ReviewFormProps) {
    const [rating, setRating] = useState(existingReview?.rating || 0)
    const [hoverRating, setHoverRating] = useState(0)
    const [text, setText] = useState(existingReview?.text || '')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!userId) {
            window.location.href = '/login'
            return
        }

        if (rating === 0) {
            alert('Prosím vyberte hodnocení')
            return
        }

        setLoading(true)

        if (existingReview) {
            // Update existing review
            await supabase
                .from('reviews')
                .update({ rating, text })
                .eq('id', existingReview.id)
        } else {
            // Create new review
            await supabase
                .from('reviews')
                .insert({
                    user_id: userId,
                    cafe_id: cafeId,
                    rating,
                    text
                })
        }

        setLoading(false)
        setSuccess(true)
        router.refresh()

        setTimeout(() => setSuccess(false), 3000)
    }

    return (
        <div className="glass-card" style={{ padding: '25px', marginTop: '20px' }}>
            <h3 style={{ marginTop: 0 }}>
                {existingReview ? '✏️ Upravit recenzi' : '⭐ Ohodnoťte tuto kavárnu'}
            </h3>

            {!userId ? (
                <p style={{ color: 'var(--text-muted)' }}>
                    <a href="/login" style={{ color: 'var(--primary)' }}>Přihlaste se</a> pro napsání recenze.
                </p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Star Rating */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)' }}>
                            Klikněte na hvězdičky:
                        </label>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        fontSize: '32px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.15s',
                                        transform: (hoverRating >= star || rating >= star) ? 'scale(1.1)' : 'scale(1)'
                                    }}
                                >
                                    {(hoverRating >= star || rating >= star) ? '⭐' : '☆'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Text Review */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                            Vaše zkušenost (nepovinné)
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Napište svůj názor na kavárnu..."
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text)',
                                fontSize: '1em',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    {/* Submit Button */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button
                            type="submit"
                            disabled={loading || rating === 0}
                            className="btn"
                            style={{
                                padding: '12px 24px',
                                opacity: (loading || rating === 0) ? 0.5 : 1
                            }}
                        >
                            {loading ? '⏳ Ukládám...' : existingReview ? '💾 Uložit změny' : '📝 Odeslat recenzi'}
                        </button>

                        {success && (
                            <span style={{ color: '#22c55e' }}>
                                ✅ Recenze uložena!
                            </span>
                        )}
                    </div>
                </form>
            )}

            {/* Rating Count */}
            <p style={{
                marginTop: '20px',
                marginBottom: 0,
                color: 'var(--text-muted)',
                fontSize: '0.9em'
            }}>
                👥 Hodnocení (0)
            </p>
        </div>
    )
}
