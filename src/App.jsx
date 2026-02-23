import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useDebt } from './context/DebtContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileNav from './components/MobileNav'

// Lazy load pages
import React, { Suspense } from 'react'
const Landing = React.lazy(() => import('./pages/Landing'))
const HowItWorks = React.lazy(() => import('./pages/HowItWorks'))
const DebtInput = React.lazy(() => import('./pages/DebtInput'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const EscapePlan = React.lazy(() => import('./pages/EscapePlan'))
const Simulator = React.lazy(() => import('./pages/Simulator'))
const About = React.lazy(() => import('./pages/About'))

const ProtectedRoute = ({ children }) => {
    const { cards } = useDebt()
    if (cards.length === 0) {
        return <Navigate to="/input" replace />
    }
    return children
}

const AppRoutes = () => {
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/input" element={<DebtInput />} />
                <Route path="/about" element={<About />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/escape-plan" element={
                    <ProtectedRoute>
                        <EscapePlan />
                    </ProtectedRoute>
                } />
                <Route path="/simulator" element={
                    <ProtectedRoute>
                        <Simulator />
                    </ProtectedRoute>
                } />
            </Routes>
        </AnimatePresence>
    )
}

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen relative bg-background-start">
                <div className="fixed inset-0 bg-grid pointer-events-none opacity-20"></div>
                <Navbar />

                <main className="flex-grow pt-20">
                    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                        <AppRoutes />
                    </Suspense>
                </main>

                <Footer />
                <MobileNav />
            </div>
        </Router>
    )
}

export default App
