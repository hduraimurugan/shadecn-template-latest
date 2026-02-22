import { createContext, useContext, useState } from 'react'

const DUMMY_CREDENTIALS = {
    email: 'admin@billflow.com',
    password: 'admin123',
    name: 'Jane Doe',
    role: 'Admin',
    initials: 'JD',
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('auth-user')
        return saved ? JSON.parse(saved) : null
    })

    const login = (email, password) => {
        if (
            email === DUMMY_CREDENTIALS.email &&
            password === DUMMY_CREDENTIALS.password
        ) {
            const userData = {
                email: DUMMY_CREDENTIALS.email,
                name: DUMMY_CREDENTIALS.name,
                role: DUMMY_CREDENTIALS.role,
                initials: DUMMY_CREDENTIALS.initials,
            }
            setUser(userData)
            localStorage.setItem('auth-user', JSON.stringify(userData))
            return { success: true }
        }
        return { success: false, error: 'Invalid email or password.' }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('auth-user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
    return ctx
}