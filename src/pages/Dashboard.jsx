import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useDebt } from '../context/DebtContext'
import { formatCurrency } from '../utils/debtCalculator'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import GlowCard from '../components/GlowCard'
import StatCard from '../components/StatCard'

const Dashboard = () => {
    const { results, cards } = useDebt()
    const { summary } = results

    if (!summary) return null

    const chartData = [
        { name: 'Principal', value: summary.totalDebt, color: '#7B2FFF' },
        { name: 'Interest', value: summary.minimumScenario.totalInterest, color: '#FF4444' }
    ]

    const totalMinInterest = summary.minimumScenario.totalInterest
    const interestRatio = (totalMinInterest / (summary.totalDebt + totalMinInterest)) * 100

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Here's Your Reality</h1>
                <p className="text-danger font-medium shadow-red-glow inline-block px-1">
                    This is what your bank doesn't tell you.
                </p>
            </div>

            {/* Big Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <StatCard
                    label="Total Debt"
                    value={formatCurrency(summary.totalDebt)}
                    subtext={`Across ${cards.length} cards`}
                    delay={0}
                />
                <StatCard
                    label="Interest You'll Pay (Min Only)"
                    value={formatCurrency(summary.minimumScenario.totalInterest)}
                    subtext="On top of what you already owe"
                    type="danger"
                    delay={0.1}
                />
                <StatCard
                    label="Years Trapped"
                    value={`${(summary.minimumScenario.months / 12).toFixed(1)} Years`}
                    subtext="If you only pay minimum due"
                    type="warning"
                    delay={0.2}
                />
            </div>

            {/* VS Comparison Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/20 rounded-3xl overflow-hidden mb-16 border border-primary/20">
                <div className="bg-danger/10 p-8 flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold text-danger mb-6 flex items-center gap-2">
                        ❌ Minimum Payments Only
                    </h3>
                    <div className="space-y-4 text-lg">
                        <div>
                            <p className="text-text-secondary text-sm">Debt Free In</p>
                            <p className="font-bold">{Math.floor(summary.minimumScenario.months / 12)}y {summary.minimumScenario.months % 12}m</p>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm">Total You'll Pay</p>
                            <p className="font-bold">{formatCurrency(summary.minimumScenario.totalPaid)}</p>
                        </div>
                        <div className="pt-4">
                            <p className="text-danger text-sm font-bold">Extra Interest Lost</p>
                            <p className="text-2xl font-black text-danger">{formatCurrency(summary.minimumScenario.totalInterest)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-success/10 p-8 flex flex-col items-center text-center relative">
                    {/* VS Divider */}
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0A0A0F] border border-primary/40 flex items-center justify-center font-bold text-primary shadow-purple-glow z-10 hidden lg:flex">
                        VS
                    </div>

                    <h3 className="text-xl font-bold text-success mb-6 flex items-center gap-2">
                        ✅ DebtFree Plan
                    </h3>
                    <div className="space-y-4 text-lg">
                        <div>
                            <p className="text-text-secondary text-sm">Debt Free In</p>
                            <p className="font-bold">{summary.planScenario.months} months</p>
                        </div>
                        <div>
                            <p className="text-text-secondary text-sm">Total You'll Pay</p>
                            <p className="font-bold">{formatCurrency(summary.planScenario.totalPaid)}</p>
                        </div>
                        <div className="pt-4">
                            <p className="text-success text-sm font-bold uppercase tracking-widest">You Save</p>
                            <p className="text-4xl font-black text-success shadow-green-glow">{formatCurrency(summary.planScenario.moneySaved)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Donut Chart */}
                <GlowCard className="flex flex-col items-center justify-center min-h-[400px]">
                    <h4 className="text-lg font-bold mb-8">Interest vs. Principal (Min. Pay)</h4>
                    <div className="h-64 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-xs text-text-secondary uppercase">Every ₹100 is</p>
                            <p className="text-2xl font-bold text-danger">₹{interestRatio.toFixed(0)}</p>
                            <p className="text-[10px] text-text-secondary">Interest Alone</p>
                        </div>
                    </div>
                    <div className="flex gap-8 mt-8">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span className="text-sm text-text-secondary">Principal</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-danger"></div>
                            <span className="text-sm text-text-secondary">Interest</span>
                        </div>
                    </div>
                </GlowCard>

                {/* Card Breakdown */}
                <div className="space-y-4">
                    <h4 className="text-xl font-bold mb-6">Your Cards</h4>
                    {cards.map((card, idx) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glow-card p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                    {card.name[0]}
                                </div>
                                <div>
                                    <p className="font-bold">{card.name}</p>
                                    <p className="text-xs text-text-secondary">{card.interestRate}%/mo</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">{formatCurrency(card.balance)}</p>
                                <p className="text-xs text-danger font-medium">
                                    Burning {formatCurrency(card.balance * (card.interestRate / 100))}/mo
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    <div className="p-6 bg-danger/5 border-l-4 border-danger rounded-r-xl mt-8">
                        <p className="text-sm">
                            <span className="font-bold">⚠️ Warning:</span> Right now, you are losing
                            <span className="text-danger font-bold ml-1">{formatCurrency(summary.totalMonthlyInterestBurning)}</span> every single month just in interest.
                            That is <span className="text-danger font-bold">{formatCurrency(summary.totalMonthlyInterestBurning * 12)}</span> per year going to your bank — not reducing your debt.
                        </p>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0F]/80 backdrop-blur-md border-t border-white/5 py-4 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="hidden md:block">
                        <span className="text-success font-bold">Your escape plan is ready.</span>
                        <p className="text-text-secondary text-xs">Save {formatCurrency(summary.planScenario.moneySaved)} by following the plan.</p>
                    </div>
                    <Link to="/escape-plan" className="glow-btn w-full md:w-auto text-center">
                        See My Plan →
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
