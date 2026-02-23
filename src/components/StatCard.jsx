import { motion, useSpring, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

const StatCard = ({ label, value, subtext, type = 'default', delay = 0 }) => {
    const countRef = useRef(null)

    // Extract number from value string if it's like "₹50,000"
    const numericValue = typeof value === 'string'
        ? parseFloat(value.replace(/[^0-9.]/g, ''))
        : value

    useEffect(() => {
        if (!countRef.current) return

        const controls = animate(0, numericValue, {
            duration: 1.5,
            delay: delay + 0.5,
            ease: "easeOut",
            onUpdate(value) {
                if (typeof value === 'number') {
                    // If the original value was a string with prefix/suffix (like ₹), 
                    // we should probably format it back, but for simplicity we'll just show the number 
                    // or let the parent handle the raw number vs string display
                    countRef.current.textContent = value.toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                    })
                }
            }
        })

        return () => controls.stop()
    }, [numericValue, delay])

    const getStyle = () => {
        switch (type) {
            case 'danger': return 'border-danger/30 shadow-red-glow'
            case 'success': return 'border-success/30 shadow-green-glow'
            case 'warning': return 'border-orange-500/30 shadow-[0_0_20px_rgba(255,165,0,0.2)]'
            default: return 'border-primary/30 shadow-purple-glow'
        }
    }

    const getTextStyle = () => {
        switch (type) {
            case 'danger': return 'text-danger'
            case 'success': return 'text-success'
            case 'warning': return 'text-orange-500'
            default: return 'text-white'
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`bg-white/5 backdrop-blur-md border rounded-2xl p-6 flex flex-col items-center text-center ${getStyle()}`}
        >
            <span className="text-text-secondary text-sm font-medium mb-2">{label}</span>
            <div className={`text-3xl font-bold mb-1 flex items-baseline gap-1 ${getTextStyle()}`}>
                {typeof value === 'string' && value.includes('₹') && <span>₹</span>}
                <span ref={countRef}>0</span>
                {typeof value === 'string' && value.includes('Years') && <span className="text-lg">Years</span>}
                {typeof value === 'string' && value.includes('%') && <span>%</span>}
            </div>
            <span className="text-text-secondary text-xs">{subtext}</span>
        </motion.div>
    )
}

export default StatCard
