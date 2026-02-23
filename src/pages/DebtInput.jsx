import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebt } from '../context/DebtContext'
import { formatCurrency } from '../utils/debtCalculator'
import GlowCard from '../components/GlowCard'
import ToastNotification from '../components/ToastNotification'

const CARD_PROVIDERS = [
    { name: 'HDFC Regalia', rate: 3.75 },
    { name: 'HDFC MoneyBack', rate: 3.5 },
    { name: 'SBI SimplyCLICK', rate: 3.5 },
    { name: 'SBI Card Elite', rate: 3.35 },
    { name: 'ICICI Amazon Pay', rate: 3.5 },
    { name: 'ICICI Coral', rate: 3.4 },
    { name: 'Axis Flipkart', rate: 3.5 },
    { name: 'Axis Magnus', rate: 3.5 },
    { name: 'Kotak 811', rate: 3.5 },
    { name: 'Kotak Royale', rate: 3.4 },
    { name: 'AmEx Membership', rate: 3.5 },
    { name: 'Other', rate: 3.5 }
]

const DebtInput = () => {
    const navigate = useNavigate()
    const { cards, addCard, removeCard, monthlyPayment, setMonthlyPayment } = useDebt()

    const [formData, setFormData] = useState({
        name: 'HDFC Regalia',
        customName: '',
        balance: '',
        interestRate: 3.75,
        minimumDue: ''
    })

    const [step, setStep] = useState(1)
    const [errors, setErrors] = useState({})
    const [toast, setToast] = useState(null)

    const handleProviderChange = (e) => {
        const provider = CARD_PROVIDERS.find(p => p.name === e.target.value)
        setFormData({
            ...formData,
            name: provider.name,
            customName: provider.name === 'Other' ? '' : provider.name,
            interestRate: provider.rate
        })
    }

    const handleAddCard = () => {
        if (formData.name === 'Other' && !formData.customName.trim()) {
            setErrors({ customName: 'Please enter a card name' })
            return
        }

        if (!formData.balance || formData.balance <= 0) {
            setErrors({ balance: 'Please enter a valid balance' })
            return
        }

        const newCard = {
            name: formData.name === 'Other' ? formData.customName : formData.name,
            balance: parseFloat(formData.balance),
            interestRate: parseFloat(formData.interestRate),
            minimumDue: formData.minimumDue ? parseFloat(formData.minimumDue) : parseFloat(formData.balance) * 0.05
        }

        addCard(newCard)
        setFormData({
            name: 'HDFC Regalia',
            customName: '',
            balance: '',
            interestRate: 3.75,
            minimumDue: ''
        })
        setErrors({})
        setToast({ message: `${newCard.name} added successfully!`, type: 'success' })
    }

    const handleSubmit = () => {
        const totalMin = cards.reduce((acc, c) => acc + c.minimumDue, 0)

        if (cards.length === 0) {
            setToast({ message: 'Please add at least one card', type: 'error' })
            return
        }

        if (monthlyPayment < totalMin) {
            setErrors({ monthlyPayment: `Amount must be at least ₹${totalMin.toLocaleString('en-IN')}` })
            return
        }

        navigate('/dashboard')
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-12 relative">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">
                    <span>Step {step} of 2</span>
                    <span>{step === 1 ? 'Add Your Cards' : 'Monthly Budget'}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: step === 1 ? '50%' : '100%' }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">
                    {step === 1 ? 'Tell Us About Your Card' : 'Define Your Strategy'}
                </h1>
                <p className="text-text-secondary">
                    Nothing is stored or sent anywhere. All calculations happen on your device.
                </p>
            </div>

            {/* Added Cards Chips */}
            {step === 1 && cards.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8">
                    <AnimatePresence>
                        {cards.map((card) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-white/5 border border-primary/30 px-4 py-2 rounded-full flex items-center gap-3 backdrop-blur-md"
                            >
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-primary font-bold uppercase">{card.name}</span>
                                    <span className="text-sm font-bold">₹{card.balance.toLocaleString('en-IN')}</span>
                                </div>
                                <button
                                    onClick={() => removeCard(card.id)}
                                    className="text-text-secondary hover:text-danger"
                                >
                                    ✕
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <GlowCard className="mb-8">
                {step === 1 ? (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Credit Card Provider</label>
                            <select
                                value={formData.name}
                                onChange={handleProviderChange}
                                className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
                            >
                                {CARD_PROVIDERS.map(p => (
                                    <option key={p.name} value={p.name}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <AnimatePresence>
                            {formData.name === 'Other' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <label className="block text-sm font-medium mb-2">Card Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. My Visa Platinum"
                                        value={formData.customName}
                                        onChange={(e) => setFormData({ ...formData, customName: e.target.value })}
                                        className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
                                    />
                                    {errors.customName && <p className="text-danger text-xs mt-1">{errors.customName}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="block text-sm font-medium">Outstanding Balance (₹)</label>
                                {formData.balance > 0 && (
                                    <span className="text-xs text-danger font-medium animate-pulse">
                                        Interest burning: ₹{(formData.balance * (formData.interestRate / 100)).toFixed(0)}/mo
                                    </span>
                                )}
                            </div>
                            <input
                                type="number"
                                placeholder="e.g. 50000"
                                value={formData.balance}
                                onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                                className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
                            />
                            {errors.balance && <p className="text-danger text-xs mt-1">{errors.balance}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="block text-sm font-medium">Monthly Interest Rate (%)</label>
                                <span className="text-xs text-text-secondary">
                                    = {(formData.interestRate * 12).toFixed(2)}% per year
                                </span>
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.interestRate}
                                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                                className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Minimum Due Amount (₹)</label>
                            <input
                                type="number"
                                placeholder="Defaults to 5% of balance"
                                value={formData.minimumDue}
                                onChange={(e) => setFormData({ ...formData, minimumDue: e.target.value })}
                                className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <button
                            onClick={handleAddCard}
                            className="w-full ghost-btn border-primary/30 text-primary hover:bg-primary/10 flex items-center justify-center gap-2"
                        >
                            <span className="text-xl">+</span> Add Another Card
                        </button>

                        {cards.length > 0 && (
                            <button
                                onClick={() => setStep(2)}
                                className="w-full glow-btn mt-4"
                            >
                                Next Step →
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Total Monthly Payment (₹)</label>
                            <input
                                type="number"
                                placeholder="How much can you pay in total?"
                                value={monthlyPayment || ''}
                                onChange={(e) => setMonthlyPayment(parseFloat(e.target.value))}
                                className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-colors text-2xl font-bold"
                            />
                            <p className="text-text-secondary text-xs mt-2">
                                Total minimum required: ₹{cards.reduce((acc, c) => acc + c.minimumDue, 0).toLocaleString('en-IN')}
                            </p>
                            {errors.monthlyPayment && <p className="text-danger text-xs mt-1 font-bold">{errors.monthlyPayment}</p>}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 ghost-btn"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-[2] glow-btn"
                            >
                                Show Me The Truth →
                            </button>
                        </div>
                    </div>
                )}
            </GlowCard>

            <div className="text-center text-text-secondary text-sm">
                🔒 We never store your data. Everything runs on your device.
            </div>

            <AnimatePresence>
                {toast && (
                    <ToastNotification
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default DebtInput
