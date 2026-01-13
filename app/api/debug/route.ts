import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()

    // Načteme všechny kavárny
    const { data: cafes, error: cafesError } = await supabase
        .from('cafes')
        .select('*')

    // Načteme kavárny s hodnocením
    const { data: cafesWithRatings, error: ratingsError } = await supabase
        .from('cafes_with_ratings')
        .select('*')

    // Načteme uživatele
    const { data: { user } } = await supabase.auth.getUser()

    // Načteme profil
    let profile = null
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
        profile = data
    }

    return NextResponse.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        user: user ? { id: user.id, email: user.email } : null,
        profile,
        cafes: {
            count: cafes?.length || 0,
            error: cafesError?.message || null,
            data: cafes
        },
        cafesWithRatings: {
            count: cafesWithRatings?.length || 0,
            error: ratingsError?.message || null,
            data: cafesWithRatings
        }
    }, { status: 200 })
}
