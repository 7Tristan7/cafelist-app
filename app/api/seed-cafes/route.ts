import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

const allCafes = [
    {
        id: 1,
        name: 'Kavárna U Stříbrného groše',
        address: 'Malá náměstí 12, Hradec Králové',
        description: 'Tradiční kavárna s historií sahající až do 19. století.',
        latitude: 50.2092,
        longitude: 15.8328,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
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
        id: 2,
        name: 'Coffee Time',
        address: 'Gočárova třída 123, Hradec Králové',
        description: 'Moderní prostor pro práci i odpočinek. Výborná výběrová káva.',
        latitude: 50.2103,
        longitude: 15.8256,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: false,
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
        id: 3,
        name: 'Café Adria',
        address: 'Pospíšilova 345, Hradec Králové',
        description: 'Útulná kavárna s velkým výběrem zákusků.',
        latitude: 50.2078,
        longitude: 15.8412,
        has_wifi: false,
        noise_level: 'hlučné',
        good_for_study: false,
        has_food: true,
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
        id: 4,
        name: 'Black Coffee',
        address: 'Okružní 789, Hradec Králové',
        description: 'Minimalistický design a maximální chuť.',
        latitude: 50.2156,
        longitude: 15.8234,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: false,
        is_specialty: true,
        is_historic: false,
        opening_hours: {
            mon: { open: '08:00', close: '18:00' },
            tue: { open: '08:00', close: '18:00' },
            wed: { open: '08:00', close: '18:00' },
            thu: { open: '08:00', close: '18:00' },
            fri: { open: '08:00', close: '18:00' },
            sat: { open: '09:00', close: '16:00' },
            sun: { open: 'closed', close: 'closed' }
        }
    },
    {
        id: 5,
        name: 'Čokoládovna',
        address: 'Eliščino nábřeží 12, Hradec Králové',
        description: 'Ráj pro milovníky čokolády v srdci HK.',
        latitude: 50.2089,
        longitude: 15.8341,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false,
        opening_hours: {
            mon: { open: '10:00', close: '19:00' },
            tue: { open: '10:00', close: '19:00' },
            wed: { open: '10:00', close: '19:00' },
            thu: { open: '10:00', close: '19:00' },
            fri: { open: '10:00', close: '20:00' },
            sat: { open: '10:00', close: '20:00' },
            sun: { open: '13:00', close: '18:00' }
        }
    },
    {
        name: 'Kavárna U Kocoura',
        address: 'Velké náměstí 123, Hradec Králové',
        description: 'Historická kavárna s útulnou atmosférou. Oblíbené místo místních umělců.',
        latitude: 50.2092,
        longitude: 15.8328,
        has_wifi: true,
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
        description: 'Moderní specialty kavárna s vlastní pražírnou.',
        latitude: 50.2105,
        longitude: 15.8256,
        has_wifi: true,
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
        description: 'Elegantní kavárna s vynikajícími zákusky přímo z vlastní cukrárny.',
        latitude: 50.2078,
        longitude: 15.8345,
        has_wifi: true,
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
        description: 'Příjemná kavárna u univerzity s rychlým WiFi a studentskými cenami.',
        latitude: 50.2034,
        longitude: 15.8312,
        has_wifi: true,
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
        description: 'Organická kavárna s bio kávou a veganskými možnostmi.',
        latitude: 50.2088,
        longitude: 15.8290,
        has_wifi: true,
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

    const results = []
    for (const cafe of allCafes) {
        // Zkusíme upsert (pokud má ID, updatuje, jinak vloží)
        const { data, error } = await supabase
            .from('cafes')
            .upsert(cafe, { onConflict: 'name' }) // Použijeme jméno jako konflikt, nebo ID pokud existuje
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
