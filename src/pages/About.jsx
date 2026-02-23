import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GlowCard from '../components/GlowCard'

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20 pb-40">
            <div className="text-center mb-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto"
                >
                    We Built DebtFree Because We Were Tired of Watching People Lose Money to Fine Print.
                </motion.h1>
                <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
                    Credit card companies earn billions from confusion. They keep interest rates complex,
                    minimum dues temptingly low, and statements deliberately confusing — so you stay trapped longer.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                <div className="bg-white/5 border border-primary/20 p-8 rounded-2xl text-center shadow-purple-glow">
                    <div className="text-4xl font-bold mb-2">300 Million+</div>
                    <div className="text-text-secondary">Credit Card Users in India</div>
                </div>
                <div className="bg-white/5 border border-danger/20 p-8 rounded-2xl text-center shadow-red-glow">
                    <div className="text-4xl font-bold mb-2">₹2.3 Lakh Cr</div>
                    <div className="text-text-secondary">Outstanding CC Debt in India</div>
                </div>
                <div className="bg-white/5 border border-success/20 p-8 rounded-2xl text-center shadow-green-glow">
                    <div className="text-4xl font-bold mb-2">Only 30%</div>
                    <div className="text-text-secondary">Indians Who Pay Full Dues</div>
                </div>
            </div>

            {/* Mission Section */}
            <GlowCard className="mb-32">
                <h2 className="text-3xl font-bold text-center mb-16">Our Promise</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <div className="text-3xl mb-6">🔒</div>
                        <h4 className="text-xl font-bold mb-4">Complete Privacy</h4>
                        <p className="text-text-secondary">
                            We built this so your most sensitive financial data never touches a server. Everything runs on your device.
                        </p>
                    </div>
                    <div>
                        <div className="text-3xl mb-6">💡</div>
                        <h4 className="text-xl font-bold mb-4">Full Transparency</h4>
                        <p className="text-text-secondary">
                            All our calculations are straightforward and honest. No hidden assumptions. No upsells disguised as advice.
                        </p>
                    </div>
                    <div>
                        <div className="text-3xl mb-6">🆓</div>
                        <h4 className="text-xl font-bold mb-4">Free Forever</h4>
                        <p className="text-text-secondary">
                            DebtFree will always be free. No premium tier. No paywalls. No credit card required.
                        </p>
                    </div>
                </div>
            </GlowCard>

            {/* Monetization Disclosure */}
            <div className="bg-white/5 border border-white/5 p-8 rounded-xl max-w-2xl mx-auto text-center mb-20 text-sm italic text-text-secondary">
                <p>
                    "We may earn a referral fee if you choose to apply for a lower-interest card through our recommendations.
                    This never influences our calculations or advice."
                </p>
            </div>

            <div className="text-center">
                <Link to="/input" className="glow-btn text-xl px-12 py-5">
                    Start Your Debt Free Journey →
                </Link>
            </div>
        </div>
    )
}

export default About
