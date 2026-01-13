'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamický import pro Leaflet (SSR problém)
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
)
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
)
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
)
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
)

interface Cafe {
    id: number
    name: string
    address: string
    latitude?: number
    longitude?: number
    good_for_study: boolean
    is_specialty: boolean
}

interface CafeMapProps {
    cafes: Cafe[]
}

export default function CafeMap({ cafes }: CafeMapProps) {
    const [isMounted, setIsMounted] = useState(false)

    // Hradec Králové centrum
    const center: [number, number] = [50.2092, 15.8328]

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Filter kavárny s GPS souřadnicemi
    const cafesWithLocation = cafes.filter(
        (cafe) => cafe.latitude && cafe.longitude
    )

    if (!isMounted) {
        return (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                <div className="loading-spinner"></div>
                Načítám mapu...
            </div>
        )
    }

    return (
        <div className="glass-card" style={{ padding: '20px', marginBottom: '30px' }}>
            <h2 style={{ color: 'var(--text)', marginBottom: '15px', fontSize: '1.4em' }}>
                🗺️ Mapa kaváren v Hradci Králové
            </h2>
            <div style={{
                height: '400px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)'
            }}>
                <MapContainer
                    center={center}
                    zoom={14}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {cafesWithLocation.map((cafe) => (
                        <Marker
                            key={cafe.id}
                            position={[cafe.latitude!, cafe.longitude!]}
                        >
                            <Popup>
                                <div style={{ minWidth: '150px' }}>
                                    <strong style={{ fontSize: '1.1em' }}>☕ {cafe.name}</strong>
                                    <br />
                                    <span style={{ color: '#666' }}>📍 {cafe.address}</span>
                                    <br />
                                    {cafe.good_for_study && (
                                        <span style={{
                                            background: '#10b981',
                                            color: 'white',
                                            padding: '2px 8px',
                                            borderRadius: '10px',
                                            fontSize: '0.8em',
                                            marginTop: '5px',
                                            display: 'inline-block'
                                        }}>
                                            ✓ Vhodné na učení
                                        </span>
                                    )}
                                    {cafe.is_specialty && (
                                        <span style={{
                                            background: '#f59e0b',
                                            color: 'white',
                                            padding: '2px 8px',
                                            borderRadius: '10px',
                                            fontSize: '0.8em',
                                            marginTop: '5px',
                                            marginLeft: '5px',
                                            display: 'inline-block'
                                        }}>
                                            ☕ Specialty
                                        </span>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '0.9em' }}>
                📍 Zobrazeno {cafesWithLocation.length} z {cafes.length} kaváren (pouze s GPS souřadnicemi)
            </p>
        </div>
    )
}
