import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        const text = await file.text()
        const lines = text.trim().split('\n')

        // Skip header if present
        const dataLines = lines[0].toLowerCase().includes('název') ? lines.slice(1) : lines

        const cafesToInsert = []

        for (const line of dataLines) {
            if (!line.trim()) continue

            // Parse CSV line (handle quoted values)
            const values = line.match(/(".*?"|[^,]+)/g)?.map(v => v.replace(/"/g, '').trim()) || []

            if (values.length >= 2) {
                cafesToInsert.push({
                    name: values[0],
                    address: values[1],
                    description: values[2] || null,
                    has_wifi: values[3]?.toLowerCase() === 'ano' || values[3]?.toLowerCase() === 'true',
                    noise_level: values[4] || 'střední',
                    good_for_study: values[5]?.toLowerCase() === 'ano' || values[5]?.toLowerCase() === 'true',
                    has_food: values[6]?.toLowerCase() === 'ano' || values[6]?.toLowerCase() === 'true',
                    is_specialty: values[7]?.toLowerCase() === 'ano' || values[7]?.toLowerCase() === 'true',
                    is_historic: values[8]?.toLowerCase() === 'ano' || values[8]?.toLowerCase() === 'true',
                    latitude: values[9] ? parseFloat(values[9]) : null,
                    longitude: values[10] ? parseFloat(values[10]) : null,
                    created_by: user.id
                })
            }
        }

        if (cafesToInsert.length === 0) {
            return NextResponse.json({ error: 'No valid data found in CSV' }, { status: 400 })
        }

        const { error } = await supabase
            .from('cafes')
            .insert(cafesToInsert)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            imported: cafesToInsert.length
        })

    } catch (error) {
        return NextResponse.json({ error: 'Failed to parse CSV' }, { status: 500 })
    }
}
