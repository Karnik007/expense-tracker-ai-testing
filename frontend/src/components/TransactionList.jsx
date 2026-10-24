import React from 'react';

/**
 * Transaction History List
 * 
 * Intentional Runtime TypeError:
 *  - Bug #9: transactions.map is called on undefined when prop is omitted
 */
export function TransactionList({ transactions, onDelete }) {
    // BUG #9 (Intentional Runtime TypeError):
    // 'transactions' is not guarded with default array or optional chaining.
    // If <TransactionList /> is rendered with transactions={undefined},
    // V8 throws: TypeError: Cannot read properties of undefined (reading 'map')
    return (
        <div className="transaction-table glass-panel">
            <div className="table-header">
                <span>Title</span>
                <span>Category</span>
                <span>Date</span>
                <span>Amount</span>
                <span>Action</span>
            </div>
            <div className="table-body">
                {transactions.map(item => (
                    <div key={item.id} className="table-row">
                        <span className="col-title">{item.title}</span>
                        <span className="col-cat badge-pill">{item.category}</span>
                        <span className="col-date">{item.date}</span>
                        <span className={`col-amount ${item.type}`}>
                            {item.type === 'income' ? '+' : '-'}${Number(item.amount).toFixed(2)}
                        </span>
                        <button className="btn-del" onClick={() => onDelete && onDelete(item.id)}>
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}