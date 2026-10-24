/**
 * FinPulse — Frontend React Benchmark Test Suite
 * Evaluates whether the AI model has corrected the 5 frontend compile-time and runtime errors.
 */

const ReactTestSuite = {
    results: [],

    assert(description, passed, details = "") {
        this.results.push({ description, passed: Boolean(passed), details });
    },

    async runAll() {
        this.results = [];

        // ----------------------------------------------------
        // Test 6: Compile-Time SyntaxError 'cosnt' in validator.js
        // ----------------------------------------------------
        let hasCosntTypo = false;
        try {
            const code = await fetch('src/utils/validator.js').then(r => r.text());
            hasCosntTypo = /cosnt\s+MAX_ALLOWED_EXPENSE/.test(code);
        } catch (e) {
            hasCosntTypo = true;
        }
        this.assert(
            "Bug #6 (Compile-Time / SyntaxError): validator.js uses valid 'const' instead of 'cosnt'",
            !hasCosntTypo,
            "SyntaxError: Found 'cosnt MAX_ALLOWED_EXPENSE' in src/utils/validator.js"
        );

        // ----------------------------------------------------
        // Test 7: Compile-Time JSX Unterminated Tag in ExpenseCard.jsx
        // ----------------------------------------------------
        let hasUnterminatedJsx = false;
        try {
            const code = await fetch('src/components/ExpenseCard.jsx').then(r => r.text());
            const openDivCount = (code.match(/<div/g) || []).length;
            const closeDivCount = (code.match(/<\/div>/g) || []).length;
            hasUnterminatedJsx = openDivCount !== closeDivCount;
        } catch (e) {
            hasUnterminatedJsx = true;
        }
        this.assert(
            "Bug #7 (Compile-Time / JSX): ExpenseCard.jsx has balanced closing JSX tags",
            !hasUnterminatedJsx,
            "SyntaxError: Unterminated JSX contents (missing closing </div> tag in ExpenseCard.jsx)"
        );

        // ----------------------------------------------------
        // Test 8: Compile-Time / CSS Property Typo in styles.css
        // ----------------------------------------------------
        let hasCssTypo = false;
        try {
            const code = await fetch('src/styles.css').then(r => r.text());
            hasCssTypo = code.includes("backgroud-color");
        } catch (e) {
            hasCssTypo = true;
        }
        this.assert(
            "Bug #8 (Compile-Time / CSS): styles.css contains no 'backgroud-color' typo",
            !hasCssTypo,
            "CSS property typo: 'backgroud-color' instead of 'background-color' in src/styles.css"
        );

        // ----------------------------------------------------
        // Test 9: Runtime TypeError in TransactionList.jsx
        // ----------------------------------------------------
        let hasGuardedTransactionsMap = false;
        try {
            const code = await fetch('src/components/TransactionList.jsx').then(r => r.text());
            // Should either default: transactions = [] or use optional chaining: transactions?.map
            hasGuardedTransactionsMap = /transactions\s*=\s*\[\]/.test(code) || 
                                       /transactions\?\.map/.test(code) || 
                                       /\(transactions\s*\|\|\s*\[\]\)\.map/.test(code);
        } catch (e) {
            hasGuardedTransactionsMap = false;
        }
        this.assert(
            "Bug #9 (Runtime TypeError): TransactionList safely guards against undefined transactions prop",
            hasGuardedTransactionsMap,
            "TypeError: Cannot read properties of undefined (reading 'map') in TransactionList.jsx"
        );

        // ----------------------------------------------------
        // Test 10: Runtime ReferenceError in SummaryCards.jsx
        // ----------------------------------------------------
        let hasUndeclaredFormatCurrency = true;
        try {
            const code = await fetch('src/components/SummaryCards.jsx').then(r => r.text());
            const callsFormatCurrency = code.includes("formatCurrency(");
            const definesOrImports = /import.*formatCurrency/.test(code) || /function\s+formatCurrency/.test(code) || /const\s+formatCurrency\s*=/.test(code);
            hasUndeclaredFormatCurrency = callsFormatCurrency && !definesOrImports;
        } catch (e) {
            hasUndeclaredFormatCurrency = true;
        }
        this.assert(
            "Bug #10 (Runtime ReferenceError): SummaryCards declares or imports formatCurrency before usage",
            !hasUndeclaredFormatCurrency,
            "ReferenceError: formatCurrency is not defined in SummaryCards.jsx"
        );

        return this.results;
    }
};

window.ReactTestSuite = ReactTestSuite;