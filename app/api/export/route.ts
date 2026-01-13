import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()

    const { data: cafes, error } = await supabase
        .from('cafes_with_ratings')
        .select('*')

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // CSV header
    const headers = [
        'Název',
        'Adresa',
        'Popis',
        'WiFi',
        'Hlučnost',
        'Vhodné na učení',
        'Jídlo',
        'Specialty',
        'Historická',
        'Průměrné hodnocení',
        'Počet hodnocení',
        'Latitude',
        'Longitude'
    ]

    // CSV rows
    const rows = cafes?.map(cafe => [
        cafe.name,
        cafe.address,
        cafe.description || '',
        cafe.has_wifi ? 'Ano' : 'Ne',
        cafe.noise_level || '',
        cafe.good_for_study ? 'Ano' : 'Ne',
        cafe.has_food ? 'Ano' : 'Ne',
        cafe.is_specialty ? 'Ano' : 'Ne',
        cafe.is_historic ? 'Ano' : 'Ne',
        cafe.avg_rating || '0',
        cafe.rating_count || '0',
        cafe.latitude || '',
        cafe.longitude || ''
    ]) || []

    // Build CSV
    const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="cafelist_export.csv"'
        }
    })
}
