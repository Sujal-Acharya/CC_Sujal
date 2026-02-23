import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const MobileNav = () => {
    const location = useLocation()

    const tabs = [
        { name: 'Home', path: '/', icon: '🏠' },
        { name: 'Calculate', path: '/input', icon: '🧮' },
        { name: 'Plan', path: '/escape-plan', icon: '🗺️' },
        { name: 'Simulate', path: '/simulator', icon: '⚡' },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0A0A0F]/80 backdrop-blur-lg border-t border-white/5 px-6 py-4">
            <div className="flex items-center justify-between">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path
                    return (
                        <Link
                            key={tab.name}
                            to={tab.path}
                            className="flex flex-col items-center gap-1 relative"
                        >
                            <span className="text-xl">{tab.icon}</span>
                            <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-text-secondary'}`}>
                                {tab.name}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                                />
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default MobileNav
