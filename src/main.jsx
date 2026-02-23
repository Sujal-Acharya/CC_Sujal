import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DebtProvider } from './context/DebtContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <DebtProvider>
            <App />
        </DebtProvider>
    </React.StrictMode>,
)
