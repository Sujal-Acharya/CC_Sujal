import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GlowCard from '../components/GlowCard'

const HowItWorks = () => {
    const steps = [
        {
            title: 'Enter Your Cards',
            icon: '💳',
            description: 'Add your credit card balance, interest rate and minimum due. No account linking. No login. Your data never leaves your device.',
            badge: 'Takes 2 minutes',
            color: 'primary'
        },
        {
            title: 'See The Brutal Truth',
            icon: '👁️',
            description: 'We calculate exactly how much extra you are paying in interest and how many years you are trapped if you only pay the minimum due every month.',
            badge: 'Eye opening',
            color: 'danger'
        },
        {
            title: 'Follow Your Escape Plan',
            icon: '🚀',
            description: 'Get a personalized month-by-month plan to become debt free. Use the What-If Simulator to see how small extra payments accelerate your freedom.',
            badge: 'Life changing',
            color: 'success'
        }
    ]

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                >
                    How DebtFree Works
                </motion.h1>
                <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                    Three simple steps to see your debt clearly and build your escape plan.
                </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mb-32">
                {/* Connection line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-primary/30 -z-10"></div>

                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-8 border-2 ${step.color === 'danger' ? 'bg-danger/10 border-danger/40 shadow-red-glow' :
                                step.color === 'success' ? 'bg-success/10 border-success/40 shadow-green-glow' :
                                    'bg-primary/10 border-primary/40 shadow-purple-glow'
                            }`}>
                            {step.icon}
                        </div>
                        <GlowCard className="text-center">
                            <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 inline-block ${step.color === 'danger' ? 'text-danger' :
                                    step.color === 'success' ? 'text-success' :
                                        'text-primary'
                                }`}>
                                Step {index + 1}
                            </span>
                            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed mb-6">
                                {step.description}
                            </p>
                            <div className="pill-badge">{step.badge}</div>
                        </GlowCard>
                    </div>
                ))}
            </div>

            {/* Education Section */}
            <section className="mb-32">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 underline decoration-primary decoration-4 underline-offset-8">
                    Why Credit Cards Are a Trap
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <GlowCard>
                        <h4 className="text-lg font-bold mb-4 text-primary">The Minimum Due Trick</h4>
                        <p className="text-text-secondary text-sm">
                            Banks set minimum due at just 5% so you feel like you are managing. But at 3.5% monthly interest, you barely reduce your principal.
                        </p>
                    </GlowCard>
                    <GlowCard>
                        <h4 className="text-lg font-bold mb-4 text-danger">The Interest Free Period Illusion</h4>
                        <p className="text-text-secondary text-sm">
                            Miss one full payment and you lose the interest free period on ALL purchases — including new ones.
                        </p>
                    </GlowCard>
                    <GlowCard>
                        <h4 className="text-lg font-bold mb-4 text-success">The EMI Rate Deception</h4>
                        <p className="text-text-secondary text-sm">
                            A 1.5% per month EMI sounds cheap. It is actually 18-20% annually — banks just show the monthly number to confuse you.
                        </p>
                    </GlowCard>
                </div>
            </section>

            <div className="text-center">
                <Link to="/input" className="glow-btn text-xl px-12 py-5">
                    Now That You Know — Let's Fix It →
                </Link>
            </div>
        </div>
    )
}

export default HowItWorks
