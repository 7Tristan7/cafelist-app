'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface StarRatingProps {
    cafeId: number
    userId?: string
    initialRating?: number
    avgRating?: number
    ratingCount?: number
    readOnly?: boolean
    size?: 'small' | 'medium' | 'large'
}

export default function StarRating({
    cafeId,
    userId,
    initialRating = 0,
    avgRating = 0,
    ratingCount = 0,
    readOnly = false,
    size = 'medium'
}: StarRatingProps) {
    const [rating, setRating] = useState(initialRating)
    const [hoverRating, setHoverRating] = useState(0)
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const sizeClasses = {
        small: { fontSize: '1em', gap: '2px' },
        medium: { fontSize: '1.5em', gap: '4px' },
        large: { fontSize: '2em', gap: '6px' }
    }

    const handleClick = async (value: number) => {
        if (readOnly || loading) return

        if (!userId) {
            alert('Pro hodnocení se musíte přihlásit')
            return
        }

        setLoading(true)

        // Upsert rating (insert or update)
        const { error } = await supabase
            .from('ratings')
            .upsert({
                cafe_id: cafeId,
                user_id: userId,
                stars: value
            }, {
                onConflict: 'cafe_id,user_id'
            })

        if (error) {
            console.error('Error submitting rating:', error)
            alert('Chyba při ukládání hodnocení')
        } else {
            setRating(value)
            setSubmitted(true)
            router.refresh()
        }

        setLoading(false)
    }

    const displayRating = hoverRating || rating

    // Read-only mode - zobrazení průměru
    if (readOnly) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                    display: 'flex',
                    gap: sizeClasses[size].gap,
                    fontSize: sizeClasses[size].fontSize
                }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            style={{
                                color: star <= Math.round(avgRating) ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                                textShadow: star <= Math.round(avgRating) ? '0 0 10px rgba(245,158,11,0.5)' : 'none'
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <span style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85em'
                }}>
                    {avgRating > 0 ? avgRating.toFixed(1) : '-'} ({ratingCount})
                </span>
            </div>
        )
    }

    // Interactive mode - pro hodnocení
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{
                display: 'flex',
                gap: sizeClasses[size].gap,
                fontSize: sizeClasses[size].fontSize
            }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        disabled={loading}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: loading ? 'wait' : 'pointer',
                            padding: '2px',
                            color: star <= displayRating ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                            transition: 'all 0.2s ease',
                            transform: star <= hoverRating ? 'scale(1.2)' : 'scale(1)',
                            textShadow: star <= displayRating ? '0 0 10px rgba(245,158,11,0.5)' : 'none'
                        }}
                    >
                        ★
                    </button>
                ))}
            </div>
            {submitted && (
                <span style={{
                    color: 'var(--success)',
                    fontSize: '0.85em',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    ✓ Hodnocení uloženo!
                </span>
            )}
            {!userId && (
                <span style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8em'
                }}>
                    Přihlaste se pro hodnocení
                </span>
            )}
        </div>
    )
}
