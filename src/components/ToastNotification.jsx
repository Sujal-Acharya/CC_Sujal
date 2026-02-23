import { motion, AnimatePresence } from 'framer-motion'

const ToastNotification = ({ message, type = 'info', onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`fixed bottom-24 right-6 z-[60] p-4 rounded-lg shadow-2xl border backdrop-blur-md flex items-center gap-3 ${type === 'error' ? 'bg-danger/10 border-danger/40 text-danger' : 'bg-primary/10 border-primary/40 text-primary'
                }`}
        >
            <span>{type === 'error' ? '⚠️' : 'ℹ️'}</span>
            <p className="text-sm font-medium">{message}</p>
            <button onClick={onClose} className="ml-2 text-white/50 hover:text-white">✕</button>
        </motion.div>
    )
}

export default ToastNotification
