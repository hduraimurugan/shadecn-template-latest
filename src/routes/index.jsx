import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import InventoryPage from '@/pages/inventory/InventoryPage'
import ProductDetailPage from '@/pages/inventory/ProductDetailPage'
import BillingPage from '../pages/BillingPage'
import CrmPage from '../pages/CrmPage'
import ReportsPage from '../pages/ReportsPage'
import SettingsPage from '../pages/SettingsPage'
import SupportPage from '../pages/SupportPage'
import ItemsPage from '@/pages/ItemsPage'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    { index: true, element: <DashboardPage /> },
                    { path: 'item', element: <ItemsPage /> },
                    { path: 'inventory', element: <InventoryPage /> },
                    { path: 'inventory/:productId', element: <ProductDetailPage /> },
                    { path: 'billing', element: <BillingPage /> },
                    { path: 'crm', element: <CrmPage /> },
                    { path: 'reports', element: <ReportsPage /> },
                    { path: 'settings', element: <SettingsPage /> },
                    { path: 'support', element: <SupportPage /> },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
])

export default router
