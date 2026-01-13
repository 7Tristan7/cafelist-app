'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Toast {
    id: number
    message: string
    type: 'success' | 'error' | 'info'
}

interface ToastContextType {
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within ToastProvider')
    }
    return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 3000)
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return '✅'
            case 'error': return '❌'
            case 'info': return 'ℹ️'
            default: return '✅'
        }
    }

    const getColor = (type: string) => {
        switch (type) {
            case 'success': return 'var(--success)'
            case 'error': return 'var(--danger)'
            case 'info': return 'var(--primary)'
            default: return 'var(--success)'
        }
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className="toast"
                        style={{
                            borderLeft: `4px solid ${getColor(toast.type)}`
                        }}
                    >
                        <span>{getIcon(toast.type)}</span>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
