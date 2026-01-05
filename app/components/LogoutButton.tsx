'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    return (
        <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600 transition-colors"
        >
            Odhlásit
        </button>
    )
}
