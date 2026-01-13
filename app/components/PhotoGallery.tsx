'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface PhotoGalleryProps {
    cafeId: number
    photos: string[]
    isAdmin: boolean
}

export default function PhotoGallery({ cafeId, photos = [], isAdmin }: PhotoGalleryProps) {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [localPhotos, setLocalPhotos] = useState<string[]>(photos)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Prosím vyberte obrázek')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Obrázek je příliš velký (max 5MB)')
            return
        }

        setUploading(true)

        const fileName = `${cafeId}/${Date.now()}-${file.name}`

        const { error: uploadError } = await supabase.storage
            .from('cafe-photos')
            .upload(fileName, file)

        if (uploadError) {
            alert('Chyba při nahrávání: ' + uploadError.message)
            setUploading(false)
            return
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('cafe-photos')
            .getPublicUrl(fileName)

        // Update cafe photos array
        const newPhotos = [...localPhotos, publicUrl]

        await supabase
            .from('cafes')
            .update({ photos: newPhotos })
            .eq('id', cafeId)

        setLocalPhotos(newPhotos)
        setUploading(false)
        router.refresh()

        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleDelete = async (photoUrl: string) => {
        if (!confirm('Opravdu chcete smazat tuto fotku?')) return

        const newPhotos = localPhotos.filter(p => p !== photoUrl)

        await supabase
            .from('cafes')
            .update({ photos: newPhotos })
            .eq('id', cafeId)

        // Extract file path from URL and delete from storage
        try {
            const urlParts = photoUrl.split('/cafe-photos/')
            if (urlParts[1]) {
                await supabase.storage
                    .from('cafe-photos')
                    .remove([urlParts[1]])
            }
        } catch (e) {
            console.error('Error deleting from storage:', e)
        }

        setLocalPhotos(newPhotos)
        router.refresh()
    }

    if (localPhotos.length === 0 && !isAdmin) {
        return null
    }

    return (
        <div className="glass-card" style={{ padding: '25px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0 }}>📷 Fotogalerie</h3>
                {isAdmin && (
                    <>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="btn btn-secondary"
                            style={{ padding: '8px 16px', fontSize: '0.9em' }}
                        >
                            {uploading ? '⏳ Nahrávám...' : '➕ Přidat fotku'}
                        </button>
                    </>
                )}
            </div>

            {localPhotos.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '12px'
                }}>
                    {localPhotos.map((photo, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'relative',
                                paddingBottom: '100%',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <img
                                src={photo}
                                alt={`Fotka ${index + 1}`}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.2s'
                                }}
                            />
                            {isAdmin && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDelete(photo)
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        background: 'rgba(239, 68, 68, 0.9)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '28px',
                                        height: '28px',
                                        cursor: 'pointer',
                                        color: 'white',
                                        fontSize: '14px'
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                    Zatím žádné fotky. {isAdmin && 'Klikněte na "Přidat fotku" pro nahrání.'}
                </p>
            )}

            {/* Lightbox */}
            {selectedPhoto && (
                <div
                    onClick={() => setSelectedPhoto(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        cursor: 'zoom-out'
                    }}
                >
                    <img
                        src={selectedPhoto}
                        alt="Zvětšená fotka"
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            borderRadius: '12px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                        }}
                    />
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            cursor: 'pointer',
                            color: 'white',
                            fontSize: '24px'
                        }}
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    )
}
