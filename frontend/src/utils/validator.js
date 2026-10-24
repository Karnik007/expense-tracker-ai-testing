/**
 * FinPulse — React Transaction Validation Utilities
 * 
 * Intentional Compile-Time Syntax Error:
 *  - Bug #6: Typo 'cosnt' instead of 'const'
 */

// BUG #6 (Intentional Compile-Time Syntax Error):
// Typo in keyword 'cosnt' instead of 'const'.
// JS Compiler/Babel raises: SyntaxError: Unexpected identifier 'MAX_ALLOWED_EXPENSE'
cosnt MAX_ALLOWED_EXPENSE = 50000;
export const MIN_ALLOWED_EXPENSE = 1;

export function validateAmount(amount) {
    const num = parseFloat(amount);
    if (isNaN(num)) return false;
    return num >= MIN_ALLOWED_EXPENSE && num <= 50000;
}