'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (password !== confirmPassword) {
            setError('Hesla se neshodují')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Heslo musí mít alespoň 6 znaků')
            setLoading(false)
            return
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name
                }
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
        }
    }

    const handleGoogleSignup = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        if (error) {
            setError(error.message)
        }
    }

    if (success) {
        return (
            <>
                <ul className="bg-bubbles">
                    <li></li><li></li><li></li><li></li>
                    <li></li><li></li><li></li><li></li>
                </ul>

                <div className="container" style={{ maxWidth: '450px', marginTop: '80px' }}>
                    <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                        <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
                        <h2>Registrace úspěšná!</h2>
                        <p style={{ color: 'var(--text-muted)', marginTop: '15px' }}>
                            Zkontrolujte svůj email a potvrďte registraci.
                        </p>
                        <Link
                            href="/login"
                            className="btn"
                            style={{ display: 'inline-block', marginTop: '25px' }}
                        >
                            Přejít na přihlášení
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <ul className="bg-bubbles">
                <li></li><li></li><li></li><li></li>
                <li></li><li></li><li></li><li></li>
            </ul>

            <div className="container" style={{ maxWidth: '450px', marginTop: '60px' }}>
                <div className="glass-card" style={{ padding: '40px' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>☕ CaféList</h1>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px' }}>
                        Vytvořte si nový účet
                    </p>

                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.5)',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            color: '#ef4444'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                Jméno
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Jan Novák"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text)',
                                    fontSize: '1em'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '18px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="vas@email.cz"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text)',
                                    fontSize: '1em'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '18px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                Heslo
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text)',
                                    fontSize: '1em'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                                Potvrdit heslo
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text)',
                                    fontSize: '1em'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn"
                            style={{ width: '100%', padding: '14px', fontSize: '1.05em' }}
                        >
                            {loading ? '⏳ Registruji...' : '✨ Vytvořit účet'}
                        </button>
                    </form>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        margin: '25px 0',
                        color: 'var(--text-muted)'
                    }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                        <span>nebo</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>

                    <button
                        onClick={handleGoogleSignup}
                        className="btn btn-secondary"
                        style={{
                            width: '100%',
                            padding: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Registrovat přes Google
                    </button>

                    <div style={{ marginTop: '25px', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Už máte účet?{' '}
                            <Link href="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                                Přihlaste se
                            </Link>
                        </p>
                    </div>

                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                            ← Zpět na hlavní stránku
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
