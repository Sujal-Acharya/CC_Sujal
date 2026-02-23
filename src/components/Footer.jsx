import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0F] border-t border-primary/20 pt-16 pb-32 md:pb-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                <div className="col-span-1 md:col-span-2">
                    <Link to="/" className="flex items-center gap-2 mb-6">
                        <span className="text-2xl font-bold">DebtFree</span>
                        <div className="w-2 h-2 rounded-full bg-primary shadow-purple-glow"></div>
                    </Link>
                    <p className="text-text-secondary max-w-sm mb-6">
                        Your money. Your freedom. Break free from high-interest debt with personalized, private data tracking.
                    </p>
                    <div className="flex gap-4">
                        {/* Social icons could go here */}
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Product</h4>
                    <ul className="space-y-4 text-text-secondary">
                        <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                        <li><Link to="/input" className="hover:text-primary transition-colors">Calculator</Link></li>
                        <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Company</h4>
                    <ul className="space-y-4 text-text-secondary">
                        <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-text-secondary text-sm">
                <p className="mb-2">© 2025 DebtFree. Not affiliated with any bank. Not financial advice. For educational purposes only.</p>
                <p>100% Private. All calculations happen on your device.</p>
            </div>
        </footer>
    )
}

export default Footer
