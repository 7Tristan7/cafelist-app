'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleSignup = async (e: React.FormEvent) => {
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
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    if (success) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="text-6xl mb-4">📧</div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Zkontrolujte svůj email!</h1>
                        <p className="text-gray-600 mb-6">
                            Odeslali jsme vám potvrzovací odkaz na <strong>{email}</strong>.
                            Klikněte na odkaz pro dokončení registrace.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Přejít na přihlášení
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-amber-800">☕ CaféList</h1>
                        <p className="text-gray-600 mt-2">Vytvořte si nový účet</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                placeholder="vas@email.cz"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Heslo
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Potvrdit heslo
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Registrace...' : 'Registrovat se'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Už máte účet?{' '}
                            <Link href="/login" className="text-amber-600 hover:text-amber-700 font-semibold">
                                Přihlásit se
                            </Link>
                        </p>
                    </div>

                    <div className="mt-4 text-center">
                        <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
                            ← Zpět na hlavní stránku
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
