import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

// Curated Unsplash cafe images - high quality coffee shop photos
const cafeImages = [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop', // Cozy cafe interior
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop', // Modern coffee shop
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop', // Cafe with plants
    'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=300&fit=crop', // Coffee and pastry
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop', // Latte art
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop', // Coffee cup close-up
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop', // Rustic cafe
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop', // Cafe workspace
    'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=300&fit=crop', // Vintage cafe
    'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=400&h=300&fit=crop', // Coffee beans
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop', // Espresso machine
    'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&h=300&fit=crop', // Cafe terrace
    'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&h=300&fit=crop', // Coffee shop bar
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop', // Cappuccino art
    'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=300&fit=crop', // Cozy corner
    'https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?w=400&h=300&fit=crop', // Industrial cafe
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop', // Morning coffee
    'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=400&h=300&fit=crop', // Modern interior
    'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=400&h=300&fit=crop', // Coffee brewing
    'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400&h=300&fit=crop', // Cafe atmosphere
    'https://images.unsplash.com/photo-1524081684673-faa13f6e8a58?w=400&h=300&fit=crop', // Specialty coffee
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop', // Pour over
    'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&h=300&fit=crop', // Coffee table
    'https://images.unsplash.com/photo-1554116154-e92f78a3e0fb?w=400&h=300&fit=crop', // Cafe books
    'https://images.unsplash.com/photo-1501747315-124a0eaca060?w=400&h=300&fit=crop', // Coffee shop window
    'https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop', // Cafe menu board
    'https://images.unsplash.com/photo-1462917882517-e150c5ce02c2?w=400&h=300&fit=crop', // Historic cafe
    'https://images.unsplash.com/photo-1516486392848-8b67ef89f113?w=400&h=300&fit=crop', // Coffee beans close
    'https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=400&h=300&fit=crop', // Tea and coffee
    'https://images.unsplash.com/photo-1464979681340-bdd28a61699e?w=400&h=300&fit=crop', // Cafe outdoor
    'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?w=400&h=300&fit=crop', // Warm cafe light
]

export async function POST() {
    const supabase = await createClient()

    // Get all cafes
    const { data: cafes, error: fetchError } = await supabase
        .from('cafes')
        .select('id, name, image_url')
        .order('id')

    if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    const results: { id: number; name: string; success: boolean; error?: string; imageUrl?: string; previousUrl?: string | null }[] = []

    // Assign images to each cafe
    for (let i = 0; i < cafes.length; i++) {
        const cafe = cafes[i]
        const imageUrl = cafeImages[i % cafeImages.length] // Cycle through images

        const { error, data } = await supabase
            .from('cafes')
            .update({ image_url: imageUrl })
            .eq('id', cafe.id)
            .select()

        if (error) {
            results.push({ id: cafe.id, name: cafe.name, success: false, error: error.message, previousUrl: cafe.image_url })
        } else {
            results.push({ id: cafe.id, name: cafe.name, success: true, imageUrl, previousUrl: cafe.image_url })
        }
    }

    const successCount = results.filter(r => r.success).length

    return NextResponse.json({
        message: `Updated ${successCount}/${cafes.length} cafes with images`,
        totalCafes: cafes.length,
        successCount,
        results
    })
}

// GET handler for easier browser access
export async function GET() {
    const supabase = await createClient()

    // Get all cafes
    const { data: cafes, error: fetchError } = await supabase
        .from('cafes')
        .select('id, name, image_url')
        .order('id')

    if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    const results: { id: number; name: string; success: boolean; error?: string; imageUrl?: string }[] = []

    // Assign images to each cafe
    for (let i = 0; i < cafes.length; i++) {
        const cafe = cafes[i]
        const imageUrl = cafeImages[i % cafeImages.length] // Cycle through images

        const { error } = await supabase
            .from('cafes')
            .update({ image_url: imageUrl })
            .eq('id', cafe.id)

        if (error) {
            results.push({ id: cafe.id, name: cafe.name, success: false, error: error.message })
        } else {
            results.push({ id: cafe.id, name: cafe.name, success: true, imageUrl })
        }
    }

    const successCount = results.filter(r => r.success).length

    return NextResponse.json({
        message: `Updated ${successCount}/${cafes.length} cafes with images`,
        totalCafes: cafes.length,
        successCount,
        cafesFound: cafes.map(c => ({ id: c.id, name: c.name, currentImage: c.image_url })),
        results
    })
}
