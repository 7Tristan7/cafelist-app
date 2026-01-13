'use client'

interface OpeningHoursProps {
    hours: {
        mon?: { open: string; close: string }
        tue?: { open: string; close: string }
        wed?: { open: string; close: string }
        thu?: { open: string; close: string }
        fri?: { open: string; close: string }
        sat?: { open: string; close: string }
        sun?: { open: string; close: string }
    } | null
}

const dayNames: Record<string, string> = {
    mon: 'Pondělí',
    tue: 'Úterý',
    wed: 'Středa',
    thu: 'Čtvrtek',
    fri: 'Pátek',
    sat: 'Sobota',
    sun: 'Neděle'
}

const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

function getCurrentDayKey(): string {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    return days[new Date().getDay()]
}

function isOpenNow(hours: OpeningHoursProps['hours']): { isOpen: boolean; closesAt?: string; opensAt?: string } {
    if (!hours) return { isOpen: false }

    const now = new Date()
    const currentDay = getCurrentDayKey()
    const todayHours = hours[currentDay as keyof typeof hours]

    if (!todayHours || todayHours.open === 'closed') {
        // Find next opening day
        for (let i = 1; i <= 7; i++) {
            const nextDayIndex = (dayOrder.indexOf(currentDay) + i) % 7
            const nextDay = dayOrder[nextDayIndex]
            const nextDayHours = hours[nextDay as keyof typeof hours]
            if (nextDayHours && nextDayHours.open !== 'closed') {
                return {
                    isOpen: false,
                    opensAt: `${dayNames[nextDay]} ${nextDayHours.open}`
                }
            }
        }
        return { isOpen: false }
    }

    const currentTime = now.getHours() * 60 + now.getMinutes()
    const [openH, openM] = todayHours.open.split(':').map(Number)
    const [closeH, closeM] = todayHours.close.split(':').map(Number)
    const openTime = openH * 60 + openM
    const closeTime = closeH * 60 + closeM

    if (currentTime >= openTime && currentTime < closeTime) {
        return { isOpen: true, closesAt: todayHours.close }
    }

    if (currentTime < openTime) {
        return { isOpen: false, opensAt: `dnes ${todayHours.open}` }
    }

    // After closing, find next opening
    for (let i = 1; i <= 7; i++) {
        const nextDayIndex = (dayOrder.indexOf(currentDay) + i) % 7
        const nextDay = dayOrder[nextDayIndex]
        const nextDayHours = hours[nextDay as keyof typeof hours]
        if (nextDayHours && nextDayHours.open !== 'closed') {
            return {
                isOpen: false,
                opensAt: `${dayNames[nextDay]} ${nextDayHours.open}`
            }
        }
    }

    return { isOpen: false }
}

export default function OpeningHours({ hours }: OpeningHoursProps) {
    if (!hours) {
        return null
    }

    const { isOpen, closesAt, opensAt } = isOpenNow(hours)
    const currentDay = getCurrentDayKey()

    return (
        <div className="glass-card" style={{ padding: '20px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0 }}>🕐 Otevírací doba</h3>
                <span style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.9em',
                    fontWeight: 600,
                    background: isOpen ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: isOpen ? '#22c55e' : '#ef4444',
                    border: `1px solid ${isOpen ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`
                }}>
                    {isOpen ? '✓ Otevřeno' : '✕ Zavřeno'}
                </span>
            </div>

            {/* Status message */}
            <p style={{
                color: 'var(--text-muted)',
                marginBottom: '15px',
                fontSize: '0.95em'
            }}>
                {isOpen
                    ? `Zavírá v ${closesAt}`
                    : opensAt ? `Otevírá ${opensAt}` : 'Otevírací dobu nejde zjistit'
                }
            </p>

            {/* Hours table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {dayOrder.map((day) => {
                    const dayHours = hours[day as keyof typeof hours]
                    const isClosed = !dayHours || dayHours.open === 'closed'
                    const isToday = day === currentDay

                    return (
                        <div
                            key={day}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                background: isToday ? 'rgba(var(--primary-rgb), 0.15)' : 'transparent',
                                fontWeight: isToday ? 600 : 400
                            }}
                        >
                            <span style={{ color: isToday ? 'var(--primary)' : 'var(--text)' }}>
                                {dayNames[day]}
                            </span>
                            <span style={{
                                color: isClosed ? 'var(--text-muted)' : 'var(--text)'
                            }}>
                                {isClosed ? 'Zavřeno' : `${dayHours.open} – ${dayHours.close}`}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
