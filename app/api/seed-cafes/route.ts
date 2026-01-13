import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

// Nové kavárny pro Hradec Králové
const newCafes = [
    {
        name: 'Kavárna U Kocoura',
        address: 'Velké náměstí 123, Hradec Králové',
        description: 'Historická kavárna s útulnou atmosférou a vynikající vídeňskou kávou. Oblíbené místo místních umělců.',
        latitude: 50.2092,
        longitude: 15.8328,
        wifi_quality: 4,
        noise_level: 'tiché',
        has_food: true,
        good_for_study: true,
        is_specialty: false,
        is_historic: true,
        opening_hours: {
            mon: { open: '08:00', close: '20:00' },
            tue: { open: '08:00', close: '20:00' },
            wed: { open: '08:00', close: '20:00' },
            thu: { open: '08:00', close: '20:00' },
            fri: { open: '08:00', close: '22:00' },
            sat: { open: '09:00', close: '22:00' },
            sun: { open: '10:00', close: '18:00' }
        }
    },
    {
        name: 'Espresso Bar HK',
        address: 'Gočárova třída 501, Hradec Králové',
        description: 'Moderní specialty kavárna s vlastní pražírnou. Nabízíme single-origin kávy z celého světa.',
        latitude: 50.2105,
        longitude: 15.8256,
        wifi_quality: 5,
        noise_level: 'střední',
        has_food: false,
        good_for_study: false,
        is_specialty: true,
        is_historic: false,
        opening_hours: {
            mon: { open: '07:00', close: '18:00' },
            tue: { open: '07:00', close: '18:00' },
            wed: { open: '07:00', close: '18:00' },
            thu: { open: '07:00', close: '18:00' },
            fri: { open: '07:00', close: '19:00' },
            sat: { open: '08:00', close: '17:00' },
            sun: { open: 'closed', close: 'closed' }
        }
    },
    {
        name: 'Café Mozart',
        address: 'Třída ČSA 200, Hradec Králové',
        description: 'Elegantní kavárna s vynikajícími zákusky a dezerty. Vlastní cukrárna přímo na místě.',
        latitude: 50.2078,
        longitude: 15.8345,
        wifi_quality: 3,
        noise_level: 'střední',
        has_food: true,
        good_for_study: true,
        is_specialty: false,
        is_historic: false,
        opening_hours: {
            mon: { open: '09:00', close: '21:00' },
            tue: { open: '09:00', close: '21:00' },
            wed: { open: '09:00', close: '21:00' },
            thu: { open: '09:00', close: '21:00' },
            fri: { open: '09:00', close: '22:00' },
            sat: { open: '10:00', close: '22:00' },
            sun: { open: '10:00', close: '20:00' }
        }
    },
    {
        name: 'Studentská kavárna',
        address: 'Hradecká 1227, Hradec Králové',
        description: 'Příjemná kavárna u univerzity. Spousta zásuvek, rychlé WiFi a studentské ceny.',
        latitude: 50.2034,
        longitude: 15.8312,
        wifi_quality: 5,
        noise_level: 'hlučné',
        has_food: true,
        good_for_study: true,
        is_specialty: false,
        is_historic: false,
        opening_hours: {
            mon: { open: '07:30', close: '22:00' },
            tue: { open: '07:30', close: '22:00' },
            wed: { open: '07:30', close: '22:00' },
            thu: { open: '07:30', close: '22:00' },
            fri: { open: '07:30', close: '23:00' },
            sat: { open: '10:00', close: '23:00' },
            sun: { open: '12:00', close: '20:00' }
        }
    },
    {
        name: 'Bio Caffé',
        address: 'Malé náměstí 78, Hradec Králové',
        description: 'Organická kavárna s bio kávou a veganskými možnostmi. Vše z lokálních zdrojů.',
        latitude: 50.2088,
        longitude: 15.8290,
        wifi_quality: 4,
        noise_level: 'tiché',
        has_food: true,
        good_for_study: true,
        is_specialty: true,
        is_historic: false,
        opening_hours: {
            mon: { open: '08:00', close: '19:00' },
            tue: { open: '08:00', close: '19:00' },
            wed: { open: '08:00', close: '19:00' },
            thu: { open: '08:00', close: '19:00' },
            fri: { open: '08:00', close: '20:00' },
            sat: { open: '09:00', close: '18:00' },
            sun: { open: '10:00', close: '17:00' }
        }
    }
]

export async function POST() {
    const supabase = await createClient()

    // Zkontrolujeme admin práva
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return NextResponse.json({ error: 'Admin only' }, { status: 403 })
    }

    // Přidáme kavárny
    const results = []
    for (const cafe of newCafes) {
        const { data, error } = await supabase
            .from('cafes')
            .insert(cafe)
            .select()
            .single()

        if (error) {
            results.push({ name: cafe.name, error: error.message })
        } else {
            results.push({ name: cafe.name, success: true, id: data.id })
        }
    }

    return NextResponse.json({ results })
}
