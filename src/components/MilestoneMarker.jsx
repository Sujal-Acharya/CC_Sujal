import { motion } from 'framer-motion'

const MilestoneMarker = ({ label, icon, type = 'success' }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 1 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold shadow-lg ${type === 'success' ? 'bg-success/10 border-success/40 text-success shadow-green-glow' : 'bg-primary/10 border-primary/40 text-primary shadow-purple-glow'
                }`}
        >
            <span>{icon}</span>
            <span>{label}</span>
        </motion.div>
    )
}

export default MilestoneMarker
