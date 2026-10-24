import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SummaryCards } from './components/SummaryCards';
import { TransactionList } from './components/TransactionList';
import { AddExpenseModal } from './components/AddExpenseModal';

const INITIAL_DATA = [
    { id: "txn-1", title: "Monthly Salary", amount: 4500.00, type: "income", category: "Income", date: "2026-10-01" },
    { id: "txn-2", title: "Apartment Rent", amount: 1450.00, type: "expense", category: "Housing", date: "2026-10-03" },
    { id: "txn-3", title: "Supermarket Groceries", amount: 285.50, type: "expense", category: "Food", date: "2026-10-08" },
    { id: "txn-4", title: "Cloud Hosting", amount: 65.00, type: "expense", category: "Utilities", date: "2026-10-14" },
    { id: "txn-5", title: "Freelance Web Design", amount: 1200.00, type: "income", category: "Income", date: "2026-10-18" }
];

export function App() {
    const [transactions, setTransactions] = useState(INITIAL_DATA);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [backendStatus, setBackendStatus] = useState('offline');

    useEffect(() => {
        fetch("http://localhost:5001/api/expenses")
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    setTransactions(data.data);
                    setBackendStatus('online');
                }
            })
            .catch(() => setBackendStatus('offline'));
    }, []);

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const netSavings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;

    const summary = { totalIncome, totalExpenses, netSavings, savingsRate };

    const handleAdd = (newTxn) => {
        setTransactions([ { ...newTxn, id: `txn-${Date.now()}` }, ...transactions ]);
    };

    const handleDelete = (id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    return (
        <div className="app-container">
            <Navbar onOpenModal={() => setIsModalOpen(true)} backendStatus={backendStatus} />
            <main className="main-content">
                <SummaryCards summary={summary} />
                <div className="section-title">
                    <h2>Recent Financial Outflow & Inflow</h2>
                    <span className="count-pill">{transactions.length} records</span>
                </div>
                <TransactionList transactions={transactions} onDelete={handleDelete} />
            </main>
            <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAdd} />
            <footer className="footer">
                <p>FinPulse React + Python Flask AI Benchmark &copy; 2026. Built for AI Automated Code Correction & Debugging Evaluations.</p>
            </footer>
        </div>
    );
}