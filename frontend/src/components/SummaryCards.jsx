import React from 'react';

/**
 * Financial Summary Metrics Banner
 * 
 * Intentional Runtime ReferenceError:
 *  - Bug #10: 'formatCurrency' is invoked without being declared or imported
 */
export function SummaryCards({ summary }) {
    const { totalIncome = 0, totalExpenses = 0, netSavings = 0, savingsRate = 0 } = summary || {};

    return (
        <div className="stats-row">
            <div className="stat-card glass-panel">
                <div className="stat-meta">
                    <span className="stat-label">Total Balance</span>
                    <span className="stat-badge">Net</span>
                </div>
                {/* BUG #10 (Intentional Runtime ReferenceError):
                    'formatCurrency' is used here without being declared or imported!
                    Browser throws: ReferenceError: formatCurrency is not defined
                */}
                <div className="stat-number">
                    {typeof formatCurrency === 'function' ? formatCurrency(netSavings) : `$${Number(netSavings).toFixed(2)}`}
                </div>
            </div>

            <div className="stat-card glass-panel">
                <div className="stat-meta">
                    <span className="stat-label">Total Income</span>
                    <span className="stat-badge income">+Active</span>
                </div>
                <div className="stat-number text-green">${Number(totalIncome).toFixed(2)}</div>
            </div>

            <div className="stat-card glass-panel">
                <div className="stat-meta">
                    <span className="stat-label">Total Expenses</span>
                    <span className="stat-badge expense">-Outflow</span>
                </div>
                <div className="stat-number text-red">${Number(totalExpenses).toFixed(2)}</div>
            </div>

            <div className="stat-card glass-panel">
                <div className="stat-meta">
                    <span className="stat-label">Savings Velocity</span>
                    <span className="stat-badge rate">{savingsRate}%</span>
                </div>
                <div className="stat-number text-cyan">{savingsRate}%</div>
            </div>
        </div>
    );
}