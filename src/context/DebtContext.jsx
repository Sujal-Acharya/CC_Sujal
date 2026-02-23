import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    calculateSummary,
    calculateEscapePlan,
    calculateSimulation
} from '../utils/debtCalculator';

const DebtContext = createContext();

export const useDebt = () => {
    const context = useContext(DebtContext);
    if (!context) {
        throw new Error('useDebt must be used within a DebtProvider');
    }
    return context;
};

export const DebtProvider = ({ children }) => {
    const [cards, setCards] = useState([]);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [strategy, setStrategy] = useState('avalanche');
    const [results, setResults] = useState({
        summary: null,
        escapePlan: null,
        simulation: null
    });

    const addCard = (card) => {
        setCards(prev => [...prev, { ...card, id: Date.now().toString() }]);
    };

    const removeCard = (id) => {
        setCards(prev => prev.filter(card => card.id !== id));
    };

    const updateCard = (id, field, value) => {
        setCards(prev => prev.map(card =>
            card.id === id ? { ...card, [field]: value } : card
        ));
    };

    useEffect(() => {
        if (cards.length > 0) {
            const summary = calculateSummary(cards, monthlyPayment);
            const escapePlan = calculateEscapePlan(cards, monthlyPayment, strategy);
            const simulation = calculateSimulation(cards, monthlyPayment, 0);

            setResults({
                summary,
                escapePlan,
                simulation
            });
        } else {
            setResults({
                summary: null,
                escapePlan: null,
                simulation: null
            });
        }
    }, [cards, monthlyPayment, strategy]);

    const resetAll = () => {
        setCards([]);
        setMonthlyPayment(0);
        setStrategy('avalanche');
        setResults({
            summary: null,
            escapePlan: null,
            simulation: null
        });
    };

    const value = {
        cards,
        monthlyPayment,
        strategy,
        results,
        addCard,
        removeCard,
        updateCard,
        setMonthlyPayment,
        setStrategy,
        resetAll
    };

    return (
        <DebtContext.Provider value={value}>
            {children}
        </DebtContext.Provider>
    );
};
