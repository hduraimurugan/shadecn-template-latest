import { createContext, useContext, useEffect, useState } from 'react'
import { COLOR_PALETTES } from '../config/themes'

const ThemeContext = createContext(null)

function getOsTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Wrap your app (or a subtree) with this provider.
 * Manages: light/dark mode, color palette, interface density, sidebar style,
 * and OS system preference sync. All state is persisted to localStorage.
 */
export function ThemeProvider({ children, defaultTheme = 'light' }) {
    const [theme, setTheme] = useState(() => {
        // If system preference was previously saved on, resolve from OS on mount
        if (localStorage.getItem('systemPreference') === 'true') return getOsTheme()
        return localStorage.getItem('theme') || defaultTheme
    })
    const [palette, setPalette] = useState(() => localStorage.getItem('palette') || 'ocean-blue')
    const [density, setDensity] = useState(() => localStorage.getItem('density') || 'balanced')
    const [sidebarStyle, setSidebarStyle] = useState(() => localStorage.getItem('sidebarStyle') || 'modern-dark')
    const [systemPreference, setSystemPreferenceRaw] = useState(() => localStorage.getItem('systemPreference') === 'true')

    // Sync `dark` class on <html> whenever theme changes
    useEffect(() => {
        const root = window.document.documentElement
        if (theme === 'dark') root.classList.add('dark')
        else root.classList.remove('dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    // Subscribe to OS color-scheme changes — no synchronous setState in body
    useEffect(() => {
        localStorage.setItem('systemPreference', systemPreference)
        if (!systemPreference) return
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = (e) => setTheme(e.matches ? 'dark' : 'light')
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [systemPreference])

    // Apply palette CSS variables directly on <html>
    useEffect(() => {
        const p = COLOR_PALETTES.find((c) => c.id === palette)
        if (!p) return
        const root = document.documentElement
        root.style.setProperty('--primary', p.primary)
        root.style.setProperty('--ring', p.ring)
        root.style.setProperty('--sidebar-primary', p.primary)
        root.style.setProperty('--sidebar-ring', p.ring)
        localStorage.setItem('palette', palette)
    }, [palette])

    // Apply density class on <html>
    useEffect(() => {
        const root = document.documentElement
        root.classList.remove('density-compact', 'density-balanced', 'density-relaxed')
        root.classList.add(`density-${density}`)
        localStorage.setItem('density', density)
    }, [density])

    // Apply sidebar-glass class on <html>
    useEffect(() => {
        document.documentElement.classList.toggle('sidebar-glass', sidebarStyle === 'glass-light')
        localStorage.setItem('sidebarStyle', sidebarStyle)
    }, [sidebarStyle])

    const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

    // Wrapped setter: immediately syncs theme with OS when turning system preference ON
    const setSystemPreference = (value) => {
        setSystemPreferenceRaw(value)
        if (value) setTheme(getOsTheme())
    }

    return (
        <ThemeContext.Provider value={{
            theme, setTheme, toggleTheme, isDark: theme === 'dark',
            palette, setPalette,
            density, setDensity,
            sidebarStyle, setSidebarStyle,
            systemPreference, setSystemPreference,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

/**
 * Use this hook anywhere inside <ThemeProvider> to access:
 *  - theme, isDark, toggleTheme(), setTheme()
 *  - palette, setPalette()
 *  - density, setDensity()
 *  - sidebarStyle, setSidebarStyle()
 *  - systemPreference, setSystemPreference()
 */
export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used inside a <ThemeProvider>')
    return ctx
}
