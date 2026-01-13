'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface CafeFiltersProps {
    isAdmin: boolean
}

export default function CafeFilters({ isAdmin }: CafeFiltersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [activeTag, setActiveTag] = useState(searchParams.get('tag') || '')
    const [importing, setImporting] = useState(false)

    const createQueryString = useCallback(
        (params: Record<string, string>) => {
            const newParams = new URLSearchParams(searchParams.toString())

            Object.entries(params).forEach(([key, value]) => {
                if (value) {
                    newParams.set(key, value)
                } else {
                    newParams.delete(key)
                }
            })

            return newParams.toString()
        },
        [searchParams]
    )

    const handleSearch = (value: string) => {
        setSearch(value)
        const queryString = createQueryString({ search: value })
        router.push(queryString ? `${pathname}?${queryString}` : pathname)
    }

    const handleTagFilter = (tag: string) => {
        const newTag = activeTag === tag ? '' : tag
        setActiveTag(newTag)
        const queryString = createQueryString({ tag: newTag })
        router.push(queryString ? `${pathname}?${queryString}` : pathname)
    }

    const handleExport = async () => {
        try {
            const response = await fetch('/api/export')
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'cafelist_export.csv'
            a.click()
        } catch (error) {
            alert('Chyba při exportu')
        }
    }

    const handleImportClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setImporting(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/import', {
                method: 'POST',
                body: formData
            })

            const result = await response.json()

            if (result.success) {
                alert(`✅ Importováno ${result.imported} kaváren`)
                router.refresh()
            } else {
                alert('❌ Chyba: ' + result.error)
            }
        } catch (error) {
            alert('❌ Chyba při importu')
        } finally {
            setImporting(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    return (
        <div className="glass-card controls">
            {/* Search Box */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Hledat kavárnu podle názvu nebo adresy..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {/* Tags Filter */}
            <div className="tags-filter">
                <button
                    className={`tag-btn ${activeTag === '' ? 'active' : ''}`}
                    onClick={() => handleTagFilter('')}
                >
                    Všechny
                </button>
                <button
                    className={`tag-btn ${activeTag === 'specialty' ? 'active' : ''}`}
                    onClick={() => handleTagFilter('specialty')}
                >
                    ☕ Specialty
                </button>
                <button
                    className={`tag-btn ${activeTag === 'quiet' ? 'active' : ''}`}
                    onClick={() => handleTagFilter('quiet')}
                >
                    🤫 Klidné
                </button>
                <button
                    className={`tag-btn ${activeTag === 'food' ? 'active' : ''}`}
                    onClick={() => handleTagFilter('food')}
                >
                    🍰 Zákusky
                </button>
                <button
                    className={`tag-btn ${activeTag === 'historic' ? 'active' : ''}`}
                    onClick={() => handleTagFilter('historic')}
                >
                    🏛️ Historické
                </button>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
                {isAdmin && (
                    <>
                        <a href="/cafes/new" className="btn">
                            ➕ Přidat kavárnu
                        </a>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".csv,.txt"
                            style={{ display: 'none' }}
                        />
                        <button
                            className="btn btn-secondary"
                            onClick={handleImportClick}
                            disabled={importing}
                        >
                            {importing ? '📥 Importuji...' : '📥 Import CSV'}
                        </button>
                    </>
                )}
                <button className="btn btn-secondary" onClick={handleExport}>
                    📤 Export CSV
                </button>
            </div>
        </div>
    )
}
