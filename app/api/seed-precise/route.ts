import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

// 30 kaváren s OPRAVENÝMI GPS souřadnicemi od uživatele
const preciseCafes = [
    {
        name: 'Café Na kole',
        address: 'Velké náměstí 130/24, Hradec Králové',
        description: 'Oblíbená kavárna přímo na Velkém náměstí. Výběrová káva z předních českých i zahraničních pražíren. Sendviče, saláty a domácí dezerty. Zahrádka s kočkami!',
        latitude: 50.209998,
        longitude: 15.835524,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: true
    },
    {
        name: 'Cona Coffee',
        address: 'Gočárova třída 1135, Hradec Králové',
        description: 'Moderní kavárna kousek od hlavního nádraží. Široká nabídka kávy včetně alternativních příprav (V60, Aeropress). Báječné dorty a dezerty.',
        latitude: 50.213726,
        longitude: 15.814490,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'Pepe Coffee',
        address: 'Švehlova 307, Hradec Králové',
        description: 'Pražírna kávy fungující od roku 2014. Zaměřuje se na výběrovou kávu z Nikaragui a Brazílie. Vynikající zákusky a makronky. Možnost nakoupit kávu domů.',
        latitude: 50.2110,
        longitude: 15.8280,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'Kavárna Muzeum',
        address: 'Eliščino nábřeží 465/7, Hradec Králové',
        description: 'Kavárna v budově muzea. Kulturní zázemí, výstavy, klidná atmosféra s výhledem na řeku Labe.',
        latitude: 50.211658,
        longitude: 15.828998,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: true
    },
    {
        name: 'CrossCafe Kopeček',
        address: 'V Kopečku 80/2, Hradec Králové',
        description: 'Pobočka řetězce CrossCafe pod náměstím. Rychlá obsluha, konzistentní kvalita kávy.',
        latitude: 50.2079,
        longitude: 15.8355,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'CrossCafe Knihovna',
        address: 'Hradecká 1250/2, Hradec Králové',
        description: 'Síťová kavárna přímo v budově knihovny. Ideální pro studenty. WiFi, zásuvky, klidné prostředí.',
        latitude: 50.2095,
        longitude: 15.8362,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'CrossCafe Gočárova',
        address: 'Gočárova tř. 761/20, Hradec Králové',
        description: 'Velká pobočka CrossCafe. Terasa, parkování poblíž, ideální na rychlou zastávku.',
        latitude: 50.2133,
        longitude: 15.8194,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'CrossCafe Atrium',
        address: 'OC Atrium, Dukelská tř. 1713/7, Hradec Králové',
        description: 'CrossCafe v nákupním centru Atrium. Rychlá obsluha při nákupech.',
        latitude: 50.2101,
        longitude: 15.8212,
        has_wifi: true,
        noise_level: 'hlučné',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'LamCafé Coffee Shop and Roastery',
        address: 'Tomkova 188/1, Hradec Králové',
        description: 'Pražírna s kavárnou. Vlastní pražená zrna, workshopy a skvělá atmosféra pro milovníky kávy.',
        latitude: 50.2105,
        longitude: 15.8331,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'Café 149',
        address: 'Velké náměstí 149, Hradec Králové',
        description: 'Kavárna v srdci historického centra s výhledem na náměstí. Příjemné posezení v historické budově.',
        latitude: 50.2096,
        longitude: 15.8350,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: true
    },
    {
        name: 'La.CAFÉ Bistro Bar',
        address: 'V Kopečku 81/1, Hradec Králové',
        description: 'Stylové bistro pod náměstím. Brunch, koktejly, kvalitní káva v moderním prostředí.',
        latitude: 50.2098,
        longitude: 15.8360,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'kafe je láska',
        address: 'Třída E. Beneše 571/98, Hradec Králové - Třebeš',
        description: 'Jedna z nejlepších specialty kaváren podle European Coffee Trip. Kavárna s vášní pro skvělou kávu. Bio čaje, dětský koutek, dog-friendly.',
        latitude: 50.2190,
        longitude: 15.8360,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'Bistro v Pekárně',
        address: 'Františka Halase 1887/12a, Hradec Králové',
        description: 'Pekárna a bistro u Futura. Čerstvé pečivo, skvělé snídaně a káva.',
        latitude: 50.1975,
        longitude: 15.8475,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Simple Café',
        address: 'Švehlova 463/4, Hradec Králové',
        description: 'Stylová specialty kavárna s profesionálními baristy. Espresso, cappuccino a filtrovaná káva. Moderní minimalistický design, ideální pro práci na notebooku.',
        latitude: 50.2105,
        longitude: 15.8285,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'Eggsit Café',
        address: 'Švehlova 504/16, Hradec Králové',
        description: 'Snídaňová kavárna zaměřená na vajíčka všemi způsoby, smoothies a brunche.',
        latitude: 50.2090,
        longitude: 15.8280,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Nokafe',
        address: 'Čelakovského 487/8, Hradec Králové',
        description: 'Kavárna a řemeslná pekárna. Čerstvý kváskový chléb, specialty káva.',
        latitude: 50.2097,
        longitude: 15.8280,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'Petrof Café',
        address: 'Na Brně 2136/4, Hradec Králové',
        description: 'Unikátní hudební kavárna v komplexu PETROF Gallery. Samohrající klavír Petrof, obrazy na stěnách. Luxusní prostředí.',
        latitude: 50.1910,
        longitude: 15.8670,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: true
    },
    {
        name: 'Hradecká kavárna',
        address: 'Komenského 240, Hradec Králové',
        description: 'Tradiční kavárna naproti soudu. Domácí zákusky, klidná atmosféra.',
        latitude: 50.2100,
        longitude: 15.8360,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: true
    },
    {
        name: 'Galerie Café',
        address: 'Velké náměstí 32, Hradec Králové',
        description: 'Útulná stylová kavárna s galerií. Poctivý šálek kávy, zákusky a umělecká atmosféra.',
        latitude: 50.2098,
        longitude: 15.8335,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: false,
        is_specialty: false,
        is_historic: true
    },
    {
        name: 'Assenza Café',
        address: 'Švehlova 443, Hradec Králové',
        description: 'Italská kavárna. Autentické espresso, tiramisu a italské dezerty.',
        latitude: 50.2098,
        longitude: 15.8285,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Coffee Čtyřlístek',
        address: 'Třída Karla IV. 610/21, Hradec Králové',
        description: 'Bezbariérová kavárna. Přátelská obsluha, kvalitní káva.',
        latitude: 50.2140,
        longitude: 15.8150,
        has_wifi: true,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Férová palačinkárna',
        address: 'Masarykovo náměstí 396/15, Hradec Králové',
        description: 'Fair trade palačinky a káva. Rodinné prostředí.',
        latitude: 50.2095,
        longitude: 15.8240,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Dobrá čajovna',
        address: 'Komenského 210, Hradec Králové',
        description: 'Autentická čajovna a kavárna. Vodní dýmky, orientální atmosféra.',
        latitude: 50.2097,
        longitude: 15.8360,
        has_wifi: false,
        noise_level: 'tiché',
        good_for_study: true,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Starbucks Coffee Hradec Králové',
        address: 'OC Futurum, Brněnská 1825/23a, Hradec Králové',
        description: 'Mezinárodní síť kaváren. Frappuccino, klasická rychlá káva.',
        latitude: 50.2055,
        longitude: 15.8695,
        has_wifi: true,
        noise_level: 'hlučné',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Sport Café',
        address: 'Velké náměstí 151/10, Hradec Králové',
        description: 'Sportovní kavárna přímo na náměstí. Projekce zápasů, snacky.',
        latitude: 50.2070,
        longitude: 15.8350,
        has_wifi: true,
        noise_level: 'hlučné',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: true
    },
    {
        name: 'GoCoffee Hradec Králové',
        address: 'Dukelská třída 1642/6, Hradec Králové',
        description: 'Moderní kavárna. Alternativní přípravy, cold brew, specialty káva.',
        latitude: 50.2140,
        longitude: 15.8190,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: true,
        has_food: true,
        is_specialty: true,
        is_historic: false
    },
    {
        name: 'Salieri Café',
        address: 'Gočárova třída 506, Hradec Králové',
        description: 'Oblíbená kavárna existující už 15 let. Pestrá paleta kávových nápojů, limonády, koktejly. Snídaňové menu.',
        latitude: 50.2100,
        longitude: 15.8285,
        has_wifi: true,
        noise_level: 'hlučné',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Alen Bakery',
        address: 'Velké náměstí 145, Hradec Králové',
        description: 'Pekárna a kavárna. Čerstvé pečivo, káva s sebou na náměstí.',
        latitude: 50.2090,
        longitude: 15.8350,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: false
    },
    {
        name: 'Kavárna Vozáb',
        address: 'Velké náměstí 143, Hradec Králové',
        description: 'Tradiční kavárna s příjemnou nabídkou. Klidné prostředí vhodné pro posezení s rodinou nebo přáteli.',
        latitude: 50.2095,
        longitude: 15.8330,
        has_wifi: true,
        noise_level: 'střední',
        good_for_study: false,
        has_food: true,
        is_specialty: false,
        is_historic: true
    },
    {
        name: 'CHROAST Espresso Bar',
        address: 'Malé náměstí 8/24, Hradec Králové',
        description: 'Vlastní pražírna kávy s espresso barem. Vyhlášená pro velejemnou chuť kávy. Malý útulný prostor, zaměřený čistě na kvalitní kávu.',
        latitude: 50.2085,
        longitude: 15.8340,
        has_wifi: false,
        noise_level: 'tiché',
        good_for_study: false,
        has_food: false,
        is_specialty: true,
        is_historic: false
    }
]

const reviews = [
    { cafeName: 'Café Na kole', rating: 5, comment: 'Moje oblíbená kavárna! Zahrádka s kočkami je úžasná.' },
    { cafeName: 'Café Na kole', rating: 4, comment: 'Přímo na náměstí, skvělá poloha. Káva výborná!' },
    { cafeName: 'Café Na kole', rating: 5, comment: 'Výběrová káva za rozumnou cenu. Dezerty domácí a chutné.' },
    { cafeName: 'Cona Coffee', rating: 5, comment: 'V60 káva zde chutná famózně. Dorty jsou umělecká díla.' },
    { cafeName: 'Cona Coffee', rating: 4, comment: 'Super kavárna u nádraží! Alternativní přípravy na vysoké úrovni.' },
    { cafeName: 'Simple Café', rating: 5, comment: 'Absolutně nejlepší káva v Hradci! Barista přesně věděl co dělá.' },
    { cafeName: 'Simple Café', rating: 5, comment: 'Moderní prostředí, výborná káva, příjemná obsluha.' },
    { cafeName: 'kafe je láska', rating: 5, comment: 'European Coffee Trip doporučil a měli pravdu. Top specialty!' },
    { cafeName: 'kafe je láska', rating: 5, comment: 'Absolutní špička. Flat white jako nikde jinde v ČR.' },
    { cafeName: 'CHROAST Espresso Bar', rating: 5, comment: 'Nejlepší espresso v městě! Vlastní pražárna.' },
    { cafeName: 'CHROAST Espresso Bar', rating: 4, comment: 'Malý prostor, ale káva je naprosto výjimečná.' },
    { cafeName: 'Petrof Café', rating: 5, comment: 'Zážitek! Samohrající klavír Petrof a skvělá káva.' },
    { cafeName: 'CrossCafe Knihovna', rating: 4, comment: 'Pro studenty ideální! WiFi, klid, zásuvky.' },
    { cafeName: 'LamCafé Coffee Shop and Roastery', rating: 5, comment: 'Skvělá pražírna! Workshopy jsou super.' },
    { cafeName: 'Kavárna Muzeum', rating: 5, comment: 'Krásný výhled na Labe, klidná atmosféra.' },
    { cafeName: 'Nokafe', rating: 5, comment: 'Nejlepší kváskový chléb v Hradci!' },
    { cafeName: 'Galerie Café', rating: 5, comment: 'Útulné místo s krásným uměním na stěnách.' },
    { cafeName: 'GoCoffee Hradec Králové', rating: 4, comment: 'Moderní kavárna, cold brew je skvělý!' },
    { cafeName: 'Eggsit Café', rating: 5, comment: 'Nejlepší snídaně ve městě!' },
    { cafeName: 'Starbucks Coffee Hradec Králové', rating: 3, comment: 'Klasický Starbucks, nic překvapivého.' },
]

export async function POST() {
    const supabase = await createClient()

    const results = {
        deleted: { cafes: 0, ratings: 0 },
        inserted: { cafes: 0, ratings: 0 },
        errors: [] as string[]
    }

    // 1. Smazat existující recenze
    const { error: deleteRatingsError } = await supabase
        .from('ratings')
        .delete()
        .neq('id', 0)

    if (deleteRatingsError) {
        results.errors.push(`Delete ratings error: ${deleteRatingsError.message}`)
    }

    // 2. Smazat existující kavárny
    const { error: deleteCafesError } = await supabase
        .from('cafes')
        .delete()
        .neq('id', 0)

    if (deleteCafesError) {
        results.errors.push(`Delete cafes error: ${deleteCafesError.message}`)
    }

    // 3. Vložit nové kavárny
    const stockImages = [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80',
        'https://images.unsplash.com/photo-1497515114629-f71d768fd61c?w=800&q=80',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
        'https://images.unsplash.com/photo-1442512595331-e89e7385a861?w=800&q=80',
        'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80',
        'https://images.unsplash.com/photo-1507133750069-b6d338dd375d?w=800&q=80',
        'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&q=80',
        'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80'
    ]

    let imageIndex = 0

    for (const cafe of preciseCafes) {
        // Assign images
        let mainImage = ''
        if (cafe.name.includes('Vozáb')) {
            mainImage = '/images/kavarna-vozab.png'
        } else if (cafe.name.includes('Starbucks')) {
            mainImage = '/images/starbucks-hk.png'
        } else if (cafe.name.includes('Polstrin')) {
            mainImage = '/images/cafe-polstrin.png'
        } else {
            mainImage = stockImages[imageIndex % stockImages.length]
            imageIndex++
        }

        // Generate gallery photos (main image + 2 others)
        const galleryPhotos = [
            mainImage,
            stockImages[(imageIndex + 1) % stockImages.length],
            stockImages[(imageIndex + 2) % stockImages.length]
        ]

        const cafeData = {
            ...cafe,
            image_url: mainImage,
            photos: galleryPhotos
        }

        const { error } = await supabase
            .from('cafes')
            .insert(cafeData)

        if (error) {
            results.errors.push(`Insert cafe "${cafe.name}": ${error.message}`)
        } else {
            results.inserted.cafes++
        }
    }

    // 4. Vložit recenze
    for (const review of reviews) {
        // Najít ID kavárny
        const { data: cafe } = await supabase
            .from('cafes')
            .select('id')
            .eq('name', review.cafeName)
            .single()

        if (cafe) {
            const { error } = await supabase
                .from('ratings')
                .insert({
                    cafe_id: cafe.id,
                    stars: review.rating,
                    comment: review.comment
                })

            if (error) {
                results.errors.push(`Insert review for "${review.cafeName}": ${error.message}`)
            } else {
                results.inserted.ratings++
            }
        }
    }

    return NextResponse.json({
        success: results.errors.length === 0,
        results
    })
}

export async function GET() {
    return NextResponse.json({
        message: 'POST to this endpoint to seed 30 cafes with CORRECTED GPS coordinates',
        cafesCount: preciseCafes.length,
        version: '2.0 - OPRAVENÉ SOUŘADNICE'
    })
}
