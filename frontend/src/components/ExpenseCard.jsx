import React from 'react';

/**
 * Individual Transaction Preview Card
 * 
 * Intentional Compile-Time JSX Syntax Error:
 *  - Bug #7: Unterminated JSX contents (missing closing </div>)
 */
export function ExpenseCard({ item }) {
    if (!item) return null;

    // BUG #7 (Intentional Compile-Time JSX SyntaxError):
    // Missing closing </div> tag before returning!
    // JSX parser / Vite compiler raises: SyntaxError: Unterminated JSX contents
    return (
        <div className="expense-preview-card">
            <div className="preview-header">
                <span className="preview-title">{item.title}</span>
                <span className={`preview-amount ${item.type}`}>
                    {item.type === 'income' ? '+' : '-'}${Number(item.amount).toFixed(2)}
                </span>
            </div>
            <span className="preview-category">{item.category}</span>
        {/* Missing closing </div> tag */}
    );
}