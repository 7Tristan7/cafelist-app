import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()

    const updates = [
        { name: 'Simple Café', lat: 50.2107556, lng: 15.8267375 },
        { name: 'Café Na kole', lat: 50.2104, lng: 15.8327 },
        { name: 'CHROAST Espresso Bar', lat: 50.2101409, lng: 15.8364720 },
        { name: 'Pepe Coffee', lat: 50.2106744, lng: 15.8263115 },
        { name: 'Petrof Café', lat: 50.1922528, lng: 15.8519164 },
        { name: 'Cona Coffee', lat: 50.2138, lng: 15.8144 },
        { name: 'Kavárna Vozáb', lat: 50.2098, lng: 15.8335 },
        { name: 'Kavárna Muzeum', lat: 50.2115907, lng: 15.8290350 },
        { name: 'LamCafé', lat: 50.210186, lng: 15.832051 },
        { name: 'Café 149', lat: 50.2099, lng: 15.8340 },
        { name: 'kafe je láska', lat: 50.1907628, lng: 15.8402344 },
        { name: 'Eggsit Café', lat: 50.2113, lng: 15.8258 },
        { name: 'Nokafe', lat: 50.2126506, lng: 15.8234747 },
        { name: 'Galerie Café', lat: 50.2095, lng: 15.8322 },
        { name: 'Starbucks Coffee Hradec Králové', lat: 50.1970128, lng: 15.8489331 },
        { name: 'Sport Café', lat: 50.2100, lng: 15.8338 },
        { name: 'GoCoffee', lat: 50.2122, lng: 15.8150 },
        { name: 'Salieri Café', lat: 50.2108, lng: 15.8215 },
        { name: 'Alen Bakery', lat: 50.2097, lng: 15.8330 },
        { name: 'Hradecká kavárna', lat: 50.2095, lng: 15.8350 },
        { name: 'Assenza Café', lat: 50.2109, lng: 15.8270 },
        { name: 'Coffee Čtyřlístek', lat: 50.2112, lng: 15.8122 },
        { name: 'Férová palačinkárna', lat: 50.2050, lng: 15.8250 },
        { name: 'Dobrá čajovna', lat: 50.2092, lng: 15.8355 }
    ]

    const results = []
    const errors = []

    for (const update of updates) {
        const { error } = await supabase
            .from('cafes')
            .update({ latitude: update.lat, longitude: update.lng })
            .ilike('name', `%${update.name}%`)

        if (error) {
            errors.push({ name: update.name, error: error.message })
        } else {
            results.push(update.name)
        }
    }

    return NextResponse.json({
        message: 'GPS Coordinates Fixed!',
        updated: results,
        errors: errors.length > 0 ? errors : undefined
    })
}
