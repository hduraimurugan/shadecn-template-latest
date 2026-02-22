import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { IconDatabase, IconEye, IconEyeOff } from '@tabler/icons-react'
import { useAuth } from '../context/AuthContext'

/* ─── Decorative bar chart SVG ──────────────────────────────── */
function BarChart() {
    const bars = [
        { x: 18,  h: 90  },
        { x: 68,  h: 145 },
        { x: 118, h: 195 },
        { x: 168, h: 120 },
        { x: 218, h: 230 },
        { x: 268, h: 175 },
        { x: 318, h: 210 },
    ]
    return (
        <svg
            viewBox="0 0 390 260"
            className="w-full h-full"
            preserveAspectRatio="xMidYMax meet"
        >
            <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4d8fff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#1a4dcc" stopOpacity="0.3" />
                </linearGradient>
            </defs>
            {bars.map((bar, i) => (
                <rect
                    key={i}
                    x={bar.x}
                    y={260 - bar.h}
                    width={38}
                    height={bar.h}
                    rx={5}
                    fill="url(#barGrad)"
                />
            ))}
        </svg>
    )
}

/* ─── Login Page ─────────────────────────────────────────────── */
export default function LoginPage() {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail]               = useState('')
    const [password, setPassword]         = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember]         = useState(false)
    const [error, setError]               = useState('')
    const [loading, setLoading]           = useState(false)

    // Already logged in → redirect to dashboard
    if (isAuthenticated) return <Navigate to="/" replace />

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Simulate network latency
        await new Promise((r) => setTimeout(r, 500))

        const result = login(email, password)
        setLoading(false)

        if (result.success) {
            navigate('/', { replace: true })
        } else {
            setError(result.error)
        }
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            {/* ── Left Panel ──────────────────────────────────── */}
            <div className="relative hidden lg:flex w-[52%] flex-col overflow-hidden bg-[#0a1628]">
                {/* Bar chart decoration */}
                <div className="absolute bottom-0 right-0 left-0 h-[62%] opacity-25 px-8">
                    <BarChart />
                </div>

                {/* Subtle radial glow */}
                <div className="absolute inset-0 bg-radial-[at_60%_60%] from-blue-900/30 to-transparent" />

                {/* Logo */}
                <div className="absolute top-7 left-8 flex items-center gap-2.5 z-10">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                        <IconDatabase size={20} className="text-white" strokeWidth={1.75} />
                    </div>
                    <span className="text-white font-bold text-[17px] tracking-tight">
                        BillFlow Inventory
                    </span>
                </div>

                {/* Headline */}
                <div className="absolute bottom-[34%] left-8 right-8 z-10">
                    <h1 className="text-white text-[2.75rem] font-extrabold leading-[1.15] mb-4">
                        Streamline your<br />commerce flow
                    </h1>
                    <p className="text-slate-300/80 text-sm leading-relaxed max-w-sm">
                        Experience the next generation of inventory management.
                        Real-time tracking, predictive analytics, and seamless billing
                        integration for modern SMBs.
                    </p>
                </div>

                {/* Footer links */}
                <div className="absolute bottom-6 left-8 right-8 flex items-center gap-5 z-10">
                    <span className="text-slate-500 text-xs">© 2024 BillFlow Inc.</span>
                    <a href="#" className="text-slate-500 text-xs hover:text-slate-300 transition-colors">Privacy Policy</a>
                    <a href="#" className="text-slate-500 text-xs hover:text-slate-300 transition-colors">Terms of Service</a>
                </div>
            </div>

            {/* ── Right Panel ─────────────────────────────────── */}
            <div className="flex flex-1 items-center justify-center bg-white px-8">
                <div className="w-full max-w-[380px]">
                    <h2 className="text-[1.6rem] font-bold text-gray-900 mb-1">Welcome back</h2>
                    <p className="text-sm text-gray-500 mb-7">
                        Please enter your details to access your dashboard.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full h-10 rounded-lg border border-gray-300 px-3 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    tabIndex={-1}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword
                                        ? <IconEyeOff size={16} strokeWidth={1.75} />
                                        : <IconEye size={16} strokeWidth={1.75} />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Remember me + Forgot password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 accent-blue-600"
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a
                                href="#"
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Error message */}
                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        {/* Hint */}
                        <p className="text-xs text-gray-400">
                            Demo: <span className="font-mono">admin@billflow.com</span> / <span className="font-mono">admin123</span>
                        </p>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>

                    {/* Sign up */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
