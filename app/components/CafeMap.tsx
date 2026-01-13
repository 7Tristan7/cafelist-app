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
const CircleMarker = dynamic(
    () => import('react-leaflet').then((mod) => mod.CircleMarker),
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

interface UserLocation {
    latitude: number
    longitude: number
}

export default function CafeMap({ cafes }: CafeMapProps) {
    const [isMounted, setIsMounted] = useState(false)
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
    const [locationError, setLocationError] = useState<string | null>(null)

    // Hradec Králové centrum
    const center: [number, number] = [50.2092, 15.8328]

    useEffect(() => {
        setIsMounted(true)

        // Získání polohy uživatele
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                },
                (error) => {
                    setLocationError(error.message)
                },
                { enableHighAccuracy: true }
            )
        }
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
                    center={userLocation ? [userLocation.latitude, userLocation.longitude] : center}
                    zoom={14}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Marker uživatelovy polohy */}
                    {userLocation && (
                        <>
                            {/* Vnější pulsující kruh */}
                            <CircleMarker
                                center={[userLocation.latitude, userLocation.longitude]}
                                radius={25}
                                pathOptions={{
                                    color: '#3b82f6',
                                    fillColor: '#3b82f6',
                                    fillOpacity: 0.15,
                                    weight: 2
                                }}
                            />
                            {/* Vnitřní plný bod */}
                            <CircleMarker
                                center={[userLocation.latitude, userLocation.longitude]}
                                radius={8}
                                pathOptions={{
                                    color: '#ffffff',
                                    fillColor: '#3b82f6',
                                    fillOpacity: 1,
                                    weight: 3
                                }}
                            >
                                <Popup>
                                    <div style={{ textAlign: 'center' }}>
                                        <strong style={{ fontSize: '1.1em' }}>📍 Vaše poloha</strong>
                                        <br />
                                        <span style={{ color: '#666', fontSize: '0.85em' }}>
                                            {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                                        </span>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        </>
                    )}

                    {/* Markery kaváren */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9em', margin: 0 }}>
                    📍 Zobrazeno {cafesWithLocation.length} z {cafes.length} kaváren
                </p>
                {userLocation && (
                    <p style={{ color: '#3b82f6', fontSize: '0.9em', margin: 0 }}>
                        🔵 Vaše poloha zobrazena na mapě
                    </p>
                )}
                {locationError && (
                    <p style={{ color: '#f59e0b', fontSize: '0.85em', margin: 0 }}>
                        ⚠️ Poloha nedostupná
                    </p>
                )}
            </div>
        </div>
    )
}

