/**
 * Debt Calculator Utilities
 */

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

export const getPayoffDate = (months) => {
    if (months === Infinity || isNaN(months)) return "Never";
    const date = new Date();
    date.setMonth(date.getMonth() + Math.ceil(months));
    return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
};

export const calculateMinimumPaymentSchedule = (cards) => {
    let totalInterestPaid = 0;
    let totalAmountPaid = 0;
    let totalMonths = 0;
    let schedule = [];

    let currentCards = cards.map(card => ({
        ...card,
        currentBalance: card.balance
    }));

    while (currentCards.some(c => c.currentBalance > 0) && totalMonths < 600) { // 50 years cap
        totalMonths++;
        let monthlyInterest = 0;
        let monthlyPrincipal = 0;
        let monthlyPayment = 0;

        currentCards.forEach(card => {
            if (card.currentBalance > 0) {
                const interest = card.currentBalance * (card.interestRate / 100);
                let minDue = Math.max(card.currentBalance * 0.05, 200);

                // If balance + interest is less than minDue, pay it off
                if (card.currentBalance + interest < minDue) {
                    minDue = card.currentBalance + interest;
                }

                const principalPart = minDue - interest;
                card.currentBalance = Math.max(0, card.currentBalance + interest - minDue);

                monthlyInterest += interest;
                monthlyPrincipal += principalPart;
                monthlyPayment += minDue;
            }
        });

        totalInterestPaid += monthlyInterest;
        totalAmountPaid += monthlyPayment;

        schedule.push({
            month: totalMonths,
            payment: monthlyPayment,
            interestPaid: monthlyInterest,
            principalPaid: monthlyPrincipal,
            remainingBalance: currentCards.reduce((acc, c) => acc + c.currentBalance, 0)
        });
    }

    return {
        totalMonths,
        totalInterestPaid,
        totalAmountPaid,
        schedule
    };
};

export const calculateEscapePlan = (cards, monthlyPayment, strategy) => {
    // Sort based on strategy
    let sortedCards = [...cards];
    if (strategy === 'avalanche') {
        sortedCards.sort((a, b) => b.interestRate - a.interestRate);
    } else {
        sortedCards.sort((a, b) => a.balance - b.balance);
    }

    let currentCards = sortedCards.map(card => ({
        ...card,
        currentBalance: card.balance,
        minDue: Math.max(card.balance * 0.05, 200)
    }));

    let totalInterestPaid = 0;
    let totalAmountPaid = 0;
    let totalMonths = 0;
    let schedule = [];
    const initialTotalDebt = cards.reduce((acc, c) => acc + c.balance, 0);

    while (currentCards.some(c => c.currentBalance > 0) && totalMonths < 600) {
        totalMonths++;
        let remainingBudget = monthlyPayment;
        let monthlyInterest = 0;
        let monthlyPrincipal = 0;

        // 1. Pay minimums on all cards first
        currentCards.forEach(card => {
            if (card.currentBalance > 0) {
                const interest = card.currentBalance * (card.interestRate / 100);
                let payment = Math.min(card.currentBalance + interest, card.minDue);

                card.tempInterest = interest;
                card.tempPayment = payment;
                remainingBudget -= payment;
            } else {
                card.tempInterest = 0;
                card.tempPayment = 0;
            }
        });

        // 2. Apply remaining budget to priority card
        if (remainingBudget > 0) {
            for (let card of currentCards) {
                if (card.currentBalance > 0) {
                    const additional = Math.min(card.currentBalance + card.tempInterest - card.tempPayment, remainingBudget);
                    card.tempPayment += additional;
                    remainingBudget -= additional;
                    if (remainingBudget <= 0) break;
                }
            }
        }

        // 3. Finalize month
        currentCards.forEach(card => {
            if (card.tempPayment > 0) {
                const interest = card.tempInterest;
                const principal = card.tempPayment - interest;
                card.currentBalance = Math.max(0, card.currentBalance + interest - card.tempPayment);

                monthlyInterest += interest;
                monthlyPrincipal += principal;
            }
        });

        totalInterestPaid += monthlyInterest;
        totalAmountPaid += (monthlyInterest + monthlyPrincipal);

        // Track payoff month for each card
        currentCards.forEach(card => {
            if (card.currentBalance === 0 && !card.payoffMonth) {
                card.payoffMonth = totalMonths;
            }
        });

        schedule.push({
            month: totalMonths,
            payment: monthlyInterest + monthlyPrincipal,
            interestPaid: monthlyInterest,
            principalPaid: monthlyPrincipal,
            remainingBalance: currentCards.reduce((acc, c) => acc + c.currentBalance, 0)
        });
    }

    const cardPayoffDates = currentCards.map(c => ({
        id: c.id,
        payoffDate: getPayoffDate(c.payoffMonth || totalMonths)
    }));

    const minScenario = calculateMinimumPaymentSchedule(cards);

    return {
        totalMonths,
        totalInterestPaid,
        totalAmountPaid,
        initialTotalDebt,
        moneySaved: Math.max(0, minScenario.totalInterestPaid - totalInterestPaid),
        monthsSaved: Math.max(0, minScenario.totalMonths - totalMonths),
        payoffDate: getPayoffDate(totalMonths),
        minScenarioMonths: minScenario.totalMonths,
        minScenarioInterest: minScenario.totalInterestPaid,
        minScenarioTotalPaid: minScenario.totalAmountPaid,
        minScenarioSchedule: minScenario.schedule,
        cardPayoffDates,
        schedule: schedule.map(s => ({
            ...s,
            progress: ((initialTotalDebt - s.remainingBalance) / initialTotalDebt) * 100
        }))
    };
};

export const calculateSimulation = (cards, monthlyPayment, extraPayment) => {
    const currentPlan = calculateEscapePlan(cards, monthlyPayment, 'avalanche');
    const extraPlan = calculateEscapePlan(cards, monthlyPayment + extraPayment, 'avalanche');
    const minPlan = calculateMinimumPaymentSchedule(cards);

    // Generate chart data for first 60 months or until all clear
    const maxMonths = Math.min(60, Math.max(currentPlan.totalMonths, extraPlan.totalMonths, minPlan.totalMonths));
    const chartData = [];

    for (let i = 0; i <= maxMonths; i++) {
        chartData.push({
            month: i,
            minimumBalance: minPlan.schedule.find(s => s.month === i)?.remainingBalance ?? (i === 0 ? minPlan.schedule[0]?.remainingBalance + minPlan.schedule[0]?.payment : 0),
            planBalance: currentPlan.schedule.find(s => s.month === i)?.remainingBalance ?? (i === 0 ? currentPlan.schedule[0]?.remainingBalance + currentPlan.schedule[0]?.payment : 0),
            extraBalance: extraPlan.schedule.find(s => s.month === i)?.remainingBalance ?? (i === 0 ? extraPlan.schedule[0]?.remainingBalance + extraPlan.schedule[0]?.payment : 0),
        });
    }

    // Fix i=0 data
    const initialDebt = cards.reduce((acc, c) => acc + c.balance, 0);
    chartData[0] = {
        month: 0,
        minimumBalance: initialDebt,
        planBalance: initialDebt,
        extraBalance: initialDebt
    };

    return {
        monthsSaved: Math.max(0, currentPlan.totalMonths - extraPlan.totalMonths),
        interestSaved: Math.max(0, currentPlan.totalInterestPaid - extraPlan.totalInterestPaid),
        newPayoffDate: extraPlan.payoffDate,
        chartData
    };
};

export const calculateSummary = (cards, monthlyPayment) => {
    const totalDebt = cards.reduce((acc, c) => acc + c.balance, 0);
    const totalMonthlyMinimum = cards.reduce((acc, c) => acc + Math.max(c.balance * 0.05, 200), 0);
    const totalMonthlyInterestBurning = cards.reduce((acc, c) => acc + (c.balance * (c.interestRate / 100)), 0);

    const worstCard = [...cards].sort((a, b) => b.interestRate - a.interestRate)[0];

    const minimumScenario = calculateMinimumPaymentSchedule(cards);
    const planScenario = calculateEscapePlan(cards, monthlyPayment, 'avalanche');

    return {
        totalDebt,
        totalMonthlyMinimum,
        totalMonthlyInterestBurning,
        worstCard: worstCard ? { name: worstCard.name, interestRate: worstCard.interestRate } : null,
        minimumScenario: {
            months: minimumScenario.totalMonths,
            totalInterest: minimumScenario.totalInterestPaid,
            totalPaid: minimumScenario.totalAmountPaid
        },
        planScenario: {
            months: planScenario.totalMonths,
            totalInterest: planScenario.totalInterestPaid,
            totalPaid: planScenario.totalAmountPaid,
            moneySaved: planScenario.moneySaved
        }
    };
};
