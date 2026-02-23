import { motion } from 'framer-motion'

const GlowCard = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`glow-card p-6 ${className}`}
        >
            {children}
        </motion.div>
    )
}

export default GlowCard
