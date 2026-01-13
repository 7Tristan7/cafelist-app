'use client'

import { useState, useEffect } from 'react'

export interface UserLocation {
    latitude: number
    longitude: number
}

export function useUserLocation() {
    const [location, setLocation] = useState<UserLocation | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolokalizace není podporována vaším prohlížečem')
            setLoading(false)
            return
        }

        const success = (position: GeolocationPosition) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            setLoading(false)
        }

        const handleError = (error: GeolocationPositionError) => {
            setError(error.message)
            setLoading(false)
        }

        navigator.geolocation.getCurrentPosition(success, handleError)
    }, [])

    const calculateDistance = (lat: number, lon: number): string | null => {
        if (!location) return null

        const R = 6371 // Radius of the earth in km
        const dLat = deg2rad(lat - location.latitude)
        const dLon = deg2rad(lon - location.longitude)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(location.latitude)) * Math.cos(deg2rad(lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const d = R * c // Distance in km

        return d < 1 ? `${Math.round(d * 1000)} m` : `${d.toFixed(1)} km`
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180)
    }

    return { location, error, loading, calculateDistance }
}
