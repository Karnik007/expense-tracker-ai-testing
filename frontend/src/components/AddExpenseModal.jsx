import React, { useState } from 'react';

export function AddExpenseModal({ isOpen, onClose, onAdd }) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('Food');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount) return;
        onAdd({
            title,
            amount: parseFloat(amount),
            type,
            category,
            date: new Date().toISOString().split('T')[0]
        });
        setTitle('');
        setAmount('');
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content glass-panel">
                <div className="modal-top">
                    <h3>New Transaction</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label>Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Coffee & Bagel" />
                    </div>
                    <div className="form-row">
                        <div className="form-item">
                            <label>Amount ($)</label>
                            <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="0.00" />
                        </div>
                        <div className="form-item">
                            <label>Type</label>
                            <select value={type} onChange={e => setType(e.target.value)}>
                                <option value="expense">Expense (-)</option>
                                <option value="income">Income (+)</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-item">
                        <label>Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="Food">Food & Dining</option>
                            <option value="Housing">Housing & Rent</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Income">Salary / Income</option>
                            <option value="General">General</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Record</button>
                    </div>
                </form>
            </div>
        </div>
    );
}