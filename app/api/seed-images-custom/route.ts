import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const imageUpdates = [
    { name: 'Kavárna Vozáb', image_url: '/images/kavarna-vozab.png' },
    { name: 'Café & bistro Polstrin', image_url: '/images/cafe-polstrin.png' },
    { name: 'Starbucks Coffee Hradec Králové', image_url: '/images/starbucks-hk.png' }
]

export async function POST() {
    const supabase = await createClient()
    const results = []

    for (const update of imageUpdates) {
        const { error } = await supabase
            .from('cafes')
            .update({ image_url: update.image_url })
            .eq('name', update.name)

        if (error) {
            results.push({ name: update.name, success: false, error: error.message })
        } else {
            results.push({ name: update.name, success: true })
        }
    }

    // Verify updates
    const names = imageUpdates.map(u => u.name)
    const { data: updatedCafes } = await supabase
        .from('cafes')
        .select('name, image_url')
        .in('name', names)

    revalidatePath('/')
    revalidatePath('/cafes/[id]', 'page')

    return NextResponse.json({ results, updatedCafes })
}

export async function GET() {
    return POST()
}
