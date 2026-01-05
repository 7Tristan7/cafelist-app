'use client'

import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface HeaderProps {
    user: any
    profile: any
}

export default function Header({ user, profile }: HeaderProps) {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    return (
        <nav className="glass-card nav-bar" style={{ marginBottom: '30px', padding: '15px 30px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: '1.5em', fontWeight: 700, color: 'var(--text)' }}>☕ CaféList</span>
            </Link>

            <div className="nav-links">
                {user ? (
                    <>
                        <div className="user-badge">
                            <span>{profile?.username || user.email}</span>
                            {profile?.role === 'admin' && (
                                <span className="admin-tag">Admin</span>
                            )}
                        </div>
                        <button onClick={handleLogout} className="btn btn-small btn-secondary">
                            Odhlásit
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="nav-link">
                            Přihlášení
                        </Link>
                        <Link href="/signup" className="btn btn-small">
                            Registrace
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
