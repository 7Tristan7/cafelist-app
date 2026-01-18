import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

// Cafés to DELETE (5)
const cafesToDelete = [
    'Coffee Čtyřlístek',
    'Salieri Café',
    'Café 149',
    'Alen Bakery',
    'Galerie Café'
]

// GPS fixes for existing cafés (12)
const gpsUpdates = [
    { name: 'Starbucks Coffee', latitude: 50.1972, longitude: 15.8437 },
    { name: 'Petrof Café', latitude: 50.1924, longitude: 15.8500 },
    { name: 'kafe je láska', latitude: 50.1974, longitude: 15.8407 },
    { name: 'Bistro v Pekárně', latitude: 50.1978, longitude: 15.8490 },
    { name: 'CrossCafe Knihovna', latitude: 50.2080, longitude: 15.8325 },
    { name: 'Férová palačinkárna', latitude: 50.2088, longitude: 15.8265 },
    { name: 'Cona Coffee', latitude: 50.2098, longitude: 15.8320 },
    { name: 'GoCoffee HK', latitude: 50.2105, longitude: 15.8180 },
    { name: 'CrossCafe Atrium', latitude: 50.2102, longitude: 15.8198 },
    { name: 'CrossCafe Gočárova', latitude: 50.2115, longitude: 15.8225 },
    { name: 'Nokafe', latitude: 50.2092, longitude: 15.8302 },
    { name: 'Pepe Coffee', latitude: 50.2125, longitude: 15.8260 }
]

// New cafés to ADD (16)
const newCafes = [
    {
        name: 'Jihlavanka café',
        address: 'Dukelská třída, Hradec Králové',
        description: 'Klasická kavárna na Dukelské třídě.',
        latitude: 50.2103,
        longitude: 15.8210,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Café & bistro Polstrin',
        address: 'Pražská třída, Hradec Králové',
        description: 'Příjemné café a bistro na Pražské třídě.',
        latitude: 50.2055,
        longitude: 15.8052,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Kavárna Boulevard',
        address: 'Třída Karla IV., Hradec Králové',
        description: 'Stylová kavárna na hlavní třídě.',
        latitude: 50.2105,
        longitude: 15.8285,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Le Waff',
        address: 'Gočárova třída, Hradec Králové',
        description: 'Moderní kavárna s vynikajícími waffy.',
        latitude: 50.2120,
        longitude: 15.8245,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Kavárna Vozáb',
        address: 'Švehlova 308/5, Hradec Králové',
        description: 'Kavárna s domáckou atmosférou.',
        latitude: 50.2106,
        longitude: 15.8262,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Assenza Café',
        address: 'Švehlova 443, Hradec Králové',
        description: 'Italská káva a sladkosti.',
        latitude: 50.2112,
        longitude: 15.8258,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'TIMEPLAY',
        address: 'Havlíčkova 508/11, Hradec Králové',
        description: 'Kavárna spojená s herním prostorem.',
        latitude: 50.2115,
        longitude: 15.8257,
        has_wifi: true,
        noise_level: 'hlučné',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Eggsit Café',
        address: 'Švehlova 504/16, Hradec Králové',
        description: 'Snídaňová kavárna s výbornou kávou.',
        latitude: 50.2114,
        longitude: 15.8255,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Simple Café',
        address: 'Švehlova 463/4, Hradec Králové',
        description: 'Minimalistická kavárna s kvalitní kávou.',
        latitude: 50.2108,
        longitude: 15.8267,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: false,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'LamCafé Coffee Shop and Roastery',
        address: 'Tomkova 188/1, Hradec Králové',
        description: 'Vlastní pražírna a výběrová káva.',
        latitude: 50.2102,
        longitude: 15.8321,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'CHROAST Espresso Bar "Námko"',
        address: 'Malé náměstí 9/8, Hradec Králové',
        description: 'Moderní espresso bar přímo na náměstí.',
        latitude: 50.2110,
        longitude: 15.8340,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: false,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'Dobrá čajovna',
        address: 'Komenského 210, Hradec Králové',
        description: 'Čajovna s klidnou atmosférou a výběrem čajů.',
        latitude: 50.2090,
        longitude: 15.8270,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Hradecká kavárna',
        address: 'Komenského 240/41, Hradec Králové',
        description: 'Tradiční kavárna v centru města.',
        latitude: 50.2098,
        longitude: 15.8377,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: true
    },
    {
        name: 'Sport Café',
        address: 'Velké náměstí 151/10, Hradec Králové',
        description: 'Sportovní kavárna přímo na náměstí.',
        latitude: 50.2096,
        longitude: 15.8323,
        has_wifi: true,
        noise_level: 'hlučné',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'CrossCafe Kopeček',
        address: 'V Kopečku 80/2, Hradec Králové',
        description: 'Pobočka oblíbené sítě CrossCafe.',
        latitude: 50.2104,
        longitude: 15.8304,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'La.CAFÉ Bistro Bar',
        address: 'V Kopečku 81/1, Hradec Králové',
        description: 'Stylové bistro a bar v centru.',
        latitude: 50.2105,
        longitude: 15.8307,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    }
]

export async function POST() {
    const supabase = await createClient()

    const results = {
        deleted: [] as { name: string; success: boolean; error?: string }[],
        updated: [] as { name: string; success: boolean; error?: string }[],
        added: [] as { name: string; success: boolean; error?: string; id?: string }[]
    }

    // 1. DELETE cafés
    for (const name of cafesToDelete) {
        const { error } = await supabase
            .from('cafes')
            .delete()
            .eq('name', name)

        if (error) {
            results.deleted.push({ name, success: false, error: error.message })
        } else {
            results.deleted.push({ name, success: true })
        }
    }

    // 2. UPDATE GPS coordinates
    for (const update of gpsUpdates) {
        const { error } = await supabase
            .from('cafes')
            .update({ latitude: update.latitude, longitude: update.longitude })
            .eq('name', update.name)

        if (error) {
            results.updated.push({ name: update.name, success: false, error: error.message })
        } else {
            results.updated.push({ name: update.name, success: true })
        }
    }

    // 3. ADD new cafés
    for (const cafe of newCafes) {
        // First check if it exists
        const { data: existing } = await supabase
            .from('cafes')
            .select('id')
            .eq('name', cafe.name)
            .single()

        if (existing) {
            // Update if exists
            const { error } = await supabase
                .from('cafes')
                .update(cafe)
                .eq('id', existing.id)

            if (error) {
                results.added.push({ name: cafe.name, success: false, error: error.message })
            } else {
                results.added.push({ name: cafe.name, success: true, id: existing.id })
            }
        } else {
            // Insert new
            const { data, error } = await supabase
                .from('cafes')
                .insert(cafe)
                .select()
                .single()

            if (error) {
                results.added.push({ name: cafe.name, success: false, error: error.message })
            } else {
                results.added.push({ name: cafe.name, success: true, id: data?.id })
            }
        }
    }

    return NextResponse.json({
        summary: {
            deleted: results.deleted.length,
            deletedSuccess: results.deleted.filter(r => r.success).length,
            updated: results.updated.length,
            updatedSuccess: results.updated.filter(r => r.success).length,
            added: results.added.length,
            addedSuccess: results.added.filter(r => r.success).length
        },
        results
    })
}
