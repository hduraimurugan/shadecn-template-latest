import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

/**
 * Wrap your app (or a subtree) with this provider.
 * Reads initial theme from localStorage and keeps
 * the document root's `dark` class in sync.
 */
export function ThemeProvider({ children, defaultTheme = 'light' }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || defaultTheme
    })

    // Sync `dark` class on <html> whenever theme changes
    useEffect(() => {
        const root = window.document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () =>
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    )
}

/**
 * Use this hook anywhere inside <ThemeProvider> to access:
 *  - theme       — 'light' | 'dark'
 *  - isDark      — boolean shorthand
 *  - toggleTheme() — flip between light and dark
 *  - setTheme(value) — set an explicit value
 */
export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) {
        throw new Error('useTheme must be used inside a <ThemeProvider>')
    }
    return ctx
}
