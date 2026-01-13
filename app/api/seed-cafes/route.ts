import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

const allCafes = [
    {
        name: 'Kavárna U Stříbrného groše',
        address: 'Malé náměstí 12, Hradec Králové',
        description: 'Tradiční kavárna s historií sahající až do 19. století.',
        latitude: 50.2092,
        longitude: 15.8328,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: true
    },
    {
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
        is_historic: false
    },
    {
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
        is_historic: false
    },
    {
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
        is_historic: false
    },
    {
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
        is_historic: false
    },
    {
        name: 'Kavárna U Kocoura',
        address: 'Velké náměstí 123, Hradec Králové',
        description: 'Historická kavárna s útulnou atmosférou. Oblíbené místo místních umělců.',
        latitude: 50.2095,
        longitude: 15.8335,
        has_wifi: true,
        noise_level: 'tiché',
        has_food: true,
        good_for_study: true,
        is_specialty: false,
        is_historic: true
    },
    {
        name: 'Espresso Bar HK',
        address: 'Gočárova třída 501, Hradec Králové',
        description: 'Moderní specialty kavárna s vlastní pražírnou.',
        latitude: 50.2105,
        longitude: 15.8260,
        has_wifi: true,
        noise_level: 'střední',
        has_food: false,
        good_for_study: false,
        is_specialty: true,
        is_historic: false
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
        is_historic: false
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
        is_historic: false
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
        is_historic: false
    }
]

export async function POST() {
    const supabase = await createClient()

    const results = []
    for (const cafe of allCafes) {
        // Nejprve zkontrolujeme, jestli kavárna existuje
        const { data: existing } = await supabase
            .from('cafes')
            .select('id')
            .eq('name', cafe.name)
            .single()

        if (existing) {
            // Aktualizujeme existující
            const { data, error } = await supabase
                .from('cafes')
                .update(cafe)
                .eq('id', existing.id)
                .select()
                .single()

            if (error) {
                results.push({ name: cafe.name, action: 'update', error: error.message })
            } else {
                results.push({ name: cafe.name, action: 'updated', success: true, id: data.id })
            }
        } else {
            // Vložíme novou
            const { data, error } = await supabase
                .from('cafes')
                .insert(cafe)
                .select()
                .single()

            if (error) {
                results.push({ name: cafe.name, action: 'insert', error: error.message })
            } else {
                results.push({ name: cafe.name, action: 'inserted', success: true, id: data.id })
            }
        }
    }

    return NextResponse.json({ results })
}

