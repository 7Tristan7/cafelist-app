'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

interface FavoriteButtonProps {
    cafeId: number
    userId?: string
    initialFavorited?: boolean
}

export default function FavoriteButton({ cafeId, userId, initialFavorited = false }: FavoriteButtonProps) {
    const [favorited, setFavorited] = useState(initialFavorited)
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        if (userId) {
            checkFavorite()
        }
    }, [userId, cafeId])

    const checkFavorite = async () => {
        const { data } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', userId)
            .eq('cafe_id', cafeId)
            .single()

        setFavorited(!!data)
    }

    const toggleFavorite = async () => {
        if (!userId) {
            window.location.href = '/login'
            return
        }

        setLoading(true)

        if (favorited) {
            // Remove from favorites
            await supabase
                .from('favorites')
                .delete()
                .eq('user_id', userId)
                .eq('cafe_id', cafeId)

            setFavorited(false)
        } else {
            // Add to favorites
            await supabase
                .from('favorites')
                .insert({
                    user_id: userId,
                    cafe_id: cafeId
                })

            setFavorited(true)
        }

        setLoading(false)
    }

    return (
        <button
            onClick={toggleFavorite}
            disabled={loading}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
                fontSize: '24px',
                transition: 'transform 0.2s',
                transform: favorited ? 'scale(1.1)' : 'scale(1)',
                filter: loading ? 'opacity(0.5)' : 'none'
            }}
            title={favorited ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}
        >
            {favorited ? '❤️' : '🤍'}
        </button>
    )
}
