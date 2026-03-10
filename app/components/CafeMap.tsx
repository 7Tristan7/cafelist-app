'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import L from 'leaflet'

// =====================================================
// FIX: Leaflet default marker icons v Next.js
// Webpack/Turbopack rozbije cesty k ikonám markers
// Řešení: nastavit ikony ručně přes CDN URL
// =====================================================
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Vlastní ikona pro kavárny (oranžový pin)
const cafeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

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
const Circle = dynamic(
    () => import('react-leaflet').then((mod) => mod.Circle),
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
    accuracy: number // přesnost v metrech
}

export default function CafeMap({ cafes }: CafeMapProps) {
    const [isMounted, setIsMounted] = useState(false)
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
    const [locationError, setLocationError] = useState<string | null>(null)

    // Hradec Králové centrum
    const center: [number, number] = [50.2092, 15.8328]

    useEffect(() => {
        setIsMounted(true)

        // Získání polohy uživatele s průběžným sledováním
        if (navigator.geolocation) {
            // Použijeme watchPosition pro průběžné aktualizace
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    })
                },
                (error) => {
                    setLocationError(error.message)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0 // vždy čerstvá data
                }
            )

            // Cleanup při unmount
            return () => {
                navigator.geolocation.clearWatch(watchId)
            }
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
                            {/* Kruh zobrazující přibližnou polohu (třetina přesnosti) */}
                            <Circle
                                center={[userLocation.latitude, userLocation.longitude]}
                                radius={userLocation.accuracy / 6}
                                pathOptions={{
                                    color: '#3b82f6',
                                    fillColor: '#3b82f6',
                                    fillOpacity: 0.1,
                                    weight: 1,
                                    dashArray: '5, 5'
                                }}
                            />
                            {/* Vnitřní plný bod - vaše poloha */}
                            <CircleMarker
                                center={[userLocation.latitude, userLocation.longitude]}
                                radius={10}
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
                                            Přesnost: ±{Math.round(userLocation.accuracy)} m
                                        </span>
                                        <br />
                                        <span style={{ color: '#999', fontSize: '0.75em' }}>
                                            {userLocation.latitude.toFixed(5)}, {userLocation.longitude.toFixed(5)}
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
                            icon={cafeIcon}
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
                        🔵 Vaše poloha (přesnost: ±{Math.round(userLocation.accuracy)} m)
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

