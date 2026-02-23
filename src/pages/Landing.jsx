import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GlowCard from '../components/GlowCard'
import StatCard from '../components/StatCard'

const Landing = () => {
    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden relative">
                {/* Planet Horizon Effect */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full -mb-48 pointer-events-none"></div>

                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="pill-badge mb-8 flex items-center gap-2"
                >
                    <span>🔒</span> 100% Private. No Bank Login Required.
                </motion.div>

                {/* Headline */}
                <div className="text-center z-10 px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-8xl font-bold mb-4 tracking-tight"
                    >
                        Stop Paying More <br />
                        <span className="text-primary">Than You Owe.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10"
                    >
                        Indians lose ₹40,000+ in unnecessary credit card interest every year.
                        Find out your real cost — and your escape plan.
                    </motion.p>
                </div>

                {/* Floating cards visuals */}
                <div className="relative h-[300px] w-full max-w-lg mb-12">
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-1/2 -translate-x-1/2 z-20 w-64 h-40 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-2xl border border-white/20 p-6 flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-8 bg-warning/50 rounded-md"></div>
                            <span className="text-xs font-bold opacity-50 italic">HDFC</span>
                        </div>
                        <div className="text-lg font-mono tracking-widest">•••• •••• •••• 4242</div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0], rotate: [-20, -22, -20] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-1/4 -translate-x-1/2 mt-8 z-10 w-64 h-40 bg-gradient-to-br from-indigo-700 to-purple-900 rounded-xl shadow-xl border border-white/10 p-6 flex flex-col justify-between opacity-80"
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-8 bg-zinc-500 rounded-md"></div>
                            <span className="text-xs font-bold opacity-50 italic">SBI</span>
                        </div>
                        <div className="text-sm font-mono opacity-50">•••• •••• •••• 1024</div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 12, 0], rotate: [20, 22, 20] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-1/4 translate-x-1/2 mt-8 z-10 w-64 h-40 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-xl shadow-xl border border-white/10 p-6 flex flex-col justify-between opacity-80"
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-8 bg-zinc-500 rounded-md"></div>
                            <span className="text-xs font-bold opacity-50 italic">ICICI</span>
                        </div>
                        <div className="text-sm font-mono opacity-50">•••• •••• •••• 8888</div>
                    </motion.div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col md:flex-row gap-4 z-10 mb-20 px-6 w-full md:w-auto">
                    <Link to="/input" className="glow-btn text-center text-lg px-10 py-4">
                        Calculate My Debt →
                    </Link>
                    <Link to="/how-it-works" className="ghost-btn text-center text-lg px-10 py-4">
                        See How It Works
                    </Link>
                </div>
            </section>

            {/* Stat Strip */}
            <div className="bg-white/5 border-y border-white/5 backdrop-blur-sm py-8 md:py-12 mb-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold mb-1">₹2.3 Lakh Cr</div>
                        <div className="text-text-secondary text-sm">Total Indian CC Debt</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold mb-1">42% Per Year</div>
                        <div className="text-text-secondary text-sm">Avg Annual Interest</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold mb-1">7 Years</div>
                        <div className="text-text-secondary text-sm">Avg Trapped on Min Pay</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold mb-1">30%</div>
                        <div className="text-text-secondary text-sm">Indians Who Pay Full</div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-20 pb-40">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Everything You Need to Break Free</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <GlowCard>
                        <div className="text-4xl mb-6">🔍</div>
                        <h3 className="text-xl font-bold mb-4">Debt Clarity</h3>
                        <p className="text-text-secondary">
                            See the true cost of your credit card debt in seconds. No jargon. No confusion.
                        </p>
                    </GlowCard>
                    <GlowCard delay={0.1}>
                        <div className="text-4xl mb-6">🗺️</div>
                        <h3 className="text-xl font-bold mb-4">Escape Plan</h3>
                        <p className="text-text-secondary">
                            Get a month-by-month personalized payoff plan using proven debt elimination strategies.
                        </p>
                    </GlowCard>
                    <GlowCard delay={0.2}>
                        <div className="text-4xl mb-6">⚡</div>
                        <h3 className="text-xl font-bold mb-4">What-If Simulator</h3>
                        <p className="text-text-secondary">
                            Discover how paying just ₹500 more per month can save you years and lakhs in interest.
                        </p>
                    </GlowCard>
                </div>
            </section>

            {/* Trust Section */}
            <section className="bg-primary/5 py-24 mb-20 border-y border-primary/10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl mb-6">🔒</div>
                        <h4 className="text-xl font-bold mb-2">No Login Required</h4>
                        <p className="text-text-secondary text-sm">We don't need your name, bank details, or phone number.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl mb-6">💾</div>
                        <h4 className="text-xl font-bold mb-2">Nothing Is Stored</h4>
                        <p className="text-text-secondary text-sm">Your data lives and dies in your browser session.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl mb-6">🆓</div>
                        <h4 className="text-xl font-bold mb-2">Completely Free</h4>
                        <p className="text-text-secondary text-sm">No premium tiers. No hidden charges. Forever free.</p>
                    </div>
                </div>
            </section>

            {/* Hero CTA */}
            <section className="max-w-4xl mx-auto px-6 py-20 text-center relative">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to face your numbers?</h2>
                <p className="text-text-secondary text-lg mb-10 max-w-lg mx-auto">
                    It takes 2 minutes. It could save you lakhs in interest and years of stress.
                </p>
                <Link to="/input" className="glow-btn inline-block text-lg px-12 py-4">
                    Calculate My Debt Free Date →
                </Link>
            </section>
        </div>
    )
}

export default Landing
