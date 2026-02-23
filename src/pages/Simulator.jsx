import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebt } from '../context/DebtContext'
import { formatCurrency, calculateSimulation, getPayoffDate } from '../utils/debtCalculator'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import GlowCard from '../components/GlowCard'

const Simulator = () => {
    const { cards, monthlyPayment, results } = useDebt()
    const { summary } = results

    const [extraPayment, setExtraPayment] = useState(1000)
    const [debouncedExtra, setDebouncedExtra] = useState(1000)

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedExtra(extraPayment)
        }, 300)
        return () => clearTimeout(timer)
    }, [extraPayment])

    const simulation = useMemo(() => {
        return calculateSimulation(cards, monthlyPayment, debouncedExtra)
    }, [cards, monthlyPayment, debouncedExtra])

    if (!summary) return null

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-2">What If You Paid A Little More?</h1>
                <p className="text-text-secondary">Move the slider and watch your future change instantly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Slider Section */}
                <GlowCard className="lg:col-span-1 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <p className="text-sm text-text-secondary uppercase mb-2">Extra payment per month</p>
                        <motion.p
                            key={extraPayment}
                            initial={{ scale: 0.8, color: '#7B2FFF' }}
                            animate={{ scale: 1, color: '#FFFFFF' }}
                            className="text-5xl font-black mb-1"
                        >
                            ₹{extraPayment.toLocaleString('en-IN')}
                        </motion.p>
                        <p className="text-xs text-text-secondary">Added to your current ₹{monthlyPayment.toLocaleString('en-IN')}</p>
                    </div>

                    <input
                        type="range"
                        min="0"
                        max="20000"
                        step="100"
                        value={extraPayment}
                        onChange={(e) => setExtraPayment(parseInt(e.target.value))}
                        className="w-full accent-primary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-text-secondary mt-2 px-1">
                        <span>₹0</span>
                        <span>₹20,000</span>
                    </div>
                </GlowCard>

                {/* Impact Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-success/5 border border-success/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-green-glow">
                        <span className="text-3xl mb-4">⏱</span>
                        <p className="text-text-secondary text-sm uppercase font-bold mb-1">Months Saved</p>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={simulation.monthsSaved}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-4xl font-black text-success"
                            >
                                {simulation.monthsSaved} <span className="text-lg">months earlier</span>
                            </motion.p>
                        </AnimatePresence>
                        <p className="text-xs text-text-secondary mt-2">New payoff date: {simulation.newPayoffDate}</p>
                    </div>

                    <div className="bg-success/5 border border-success/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-green-glow">
                        <span className="text-3xl mb-4">💰</span>
                        <p className="text-text-secondary text-sm uppercase font-bold mb-1">Interest Saved</p>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={simulation.interestSaved}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-4xl font-black text-success"
                            >
                                {formatCurrency(simulation.interestSaved)}
                            </motion.p>
                        </AnimatePresence>
                        <p className="text-xs text-text-secondary mt-2">Money that stays in your pocket</p>
                    </div>
                </div>
            </div>

            {/* Line Chart */}
            <GlowCard className="mb-12 min-h-[500px] p-8">
                <h4 className="text-xl font-bold mb-8">Payoff Timeline Comparison</h4>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={simulation.chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(123,47,255,0.1)" />
                            <XAxis
                                dataKey="month"
                                stroke="#A89EC9"
                                fontSize={12}
                                label={{ value: 'Months', position: 'insideBottom', offset: -5, fill: '#A89EC9' }}
                            />
                            <YAxis
                                stroke="#A89EC9"
                                fontSize={12}
                                tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                                label={{ value: 'Balance', angle: -90, position: 'insideLeft', fill: '#A89EC9' }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1A0A2E', border: '1px solid rgba(123,47,255,0.3)', borderRadius: '12px' }}
                                formatter={(val) => formatCurrency(val)}
                            />
                            <Legend />
                            <Line
                                name="Minimum Only"
                                type="monotone"
                                dataKey="minimumBalance"
                                stroke="#FF4444"
                                strokeDasharray="5 5"
                                dot={false}
                            />
                            <Line
                                name={`Current Plan (₹${monthlyPayment})`}
                                type="monotone"
                                dataKey="planBalance"
                                stroke="#A89EC9"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                name={`With ₹${extraPayment} Extra`}
                                type="monotone"
                                dataKey="extraBalance"
                                stroke="#7B2FFF"
                                strokeWidth={4}
                                shadow="0 0 10px rgba(123,47,255,0.5)"
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </GlowCard>

            {/* Insight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[500, 2000, 5000].map(amt => {
                    const sim = calculateSimulation(cards, monthlyPayment, amt)
                    return (
                        <div key={amt} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start gap-4">
                            <div className="text-success text-xl">✓</div>
                            <div>
                                <p className="text-sm font-bold">
                                    Paying <span className="text-primary italic">₹{amt.toLocaleString('en-IN')}</span> extra saves
                                    <span className="text-success ml-1">{formatCurrency(sim.interestSaved)}</span>
                                </p>
                                <p className="text-xs text-text-secondary mt-1">And makes you free {sim.monthsSaved} months earlier.</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Simulator
