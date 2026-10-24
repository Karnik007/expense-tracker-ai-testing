# FinPulse — AI Benchmark Ground Truth Key (Compile-Time & Runtime Errors)

This benchmark evaluates an AI code-repair system across **Python (Flask)** and **React (JSX)**.
It contains **strictly Compile-Time SyntaxErrors and Runtime Exceptions** (`TypeError`, `NameError`, `AttributeError`, `ReferenceError`) with **zero logical errors**.

---

## Master Error Matrix

| ID | Stack | Classification | Target File | Exact Exception / Error |
|---|---|---|---|---|
| **#1** | Python | **Compile-Time** (SyntaxError) | `backend/validators.py` | `SyntaxError: expected ':'` at line 11 (missing colon in `def validate_expense(payload)`) |
| **#2** | Python | **Compile-Time** (SyntaxError) | `backend/validators.py` | `SyntaxError: invalid syntax` (typo in keyword `exceppt ValueError:`) |
| **#3** | Python | **Runtime** (NameError) | `backend/services.py` | `NameError: name 'datetime' is not defined` (used without `import datetime`) |
| **#4** | Python | **Runtime** (AttributeError) | `backend/models.py` | `AttributeError: 'dict' object has no attribute 'append'` in `get_category_breakdown()` |
| **#5** | Python | **Runtime** (TypeError) | `backend/services.py` | `TypeError: unsupported operand type(s) for +: 'float' and 'NoneType'` in `calculate_tax_inclusive_total()` |
| **#6** | React | **Compile-Time** (SyntaxError) | `frontend/src/utils/validator.js` | `SyntaxError: Unexpected identifier 'MAX_ALLOWED_EXPENSE'` (keyword typo `cosnt`) |
| **#7** | React | **Compile-Time** (JSX Syntax) | `frontend/src/components/ExpenseCard.jsx` | `SyntaxError: Unterminated JSX contents` (unclosed `<div>` element) |
| **#8** | React | **Compile-Time** (CSS Syntax) | `frontend/src/styles.css` | Invalid CSS property: `backgroud-color` instead of `background-color` in `.stat-badge.income` |
| **#9** | React | **Runtime** (TypeError) | `frontend/src/components/TransactionList.jsx` | `TypeError: Cannot read properties of undefined (reading 'map')` when prop is omitted |
| **#10**| React | **Runtime** (ReferenceError) | `frontend/src/components/SummaryCards.jsx` | `ReferenceError: formatCurrency is not defined` (invoked without declaration or import) |

---

## Detailed Error Specifications & Solutions

### Bug #1: Missing Function Colon (Python Compile-Time SyntaxError)
- **File**: `backend/validators.py`
- **Error**: `SyntaxError: expected ':'`
- **Buggy Code**:
  ```python
  def validate_expense(payload)
  ```
- **Correction**:
  ```python
  def validate_expense(payload):
  ```
- **Explanation**: Python function declarations require a trailing colon `:` before the indented block.

---

### Bug #2: Typo in `except` Keyword (Python Compile-Time SyntaxError)
- **File**: `backend/validators.py`
- **Error**: `SyntaxError: invalid syntax`
- **Buggy Code**:
  ```python
  exceppt ValueError:
  ```
- **Correction**:
  ```python
  except ValueError:
  ```
- **Explanation**: `exceppt` is an unrecognized identifier in Python syntax.

---

### Bug #3: Undeclared Module `datetime` (Python Runtime NameError)
- **File**: `backend/services.py`
- **Error**: `NameError: name 'datetime' is not defined`
- **Buggy Code**:
  ```python
  timestamp = datetime.datetime.now().isoformat()
  ```
- **Correction**:
  ```python
  import datetime
  # ...
  timestamp = datetime.datetime.now().isoformat()
  ```
- **Explanation**: The standard library module `datetime` must be imported at the top of the file before accessing its attributes.

---

### Bug #4: Calling `.append()` on a Dictionary (Python Runtime AttributeError)
- **File**: `backend/models.py`
- **Error**: `AttributeError: 'dict' object has no attribute 'append'`
- **Buggy Code**:
  ```python
  breakdown = {}
  # ...
  breakdown.append({"total_categories": len(breakdown)})
  ```
- **Correction**:
  ```python
  breakdown["total_categories"] = len(breakdown)
  ```
- **Explanation**: In Python, dictionaries use key-value assignment (`dict[key] = val`). Only lists have the `.append()` method.

---

### Bug #5: Adding Float and `NoneType` (Python Runtime TypeError)
- **File**: `backend/services.py`
- **Error**: `TypeError: unsupported operand type(s) for +: 'float' and 'NoneType'`
- **Buggy Code**:
  ```python
  total_with_tax = txn["amount"] + txn["tax"]
  ```
- **Correction**:
  ```python
  tax = txn.get("tax") or 0.0
  total_with_tax = txn["amount"] + tax
  ```
- **Explanation**: `txn["tax"]` is `None` for untaxed transactions. In Python, adding a number to `None` raises a `TypeError`.

---

### Bug #6: Typo in `const` Keyword (React Compile-Time SyntaxError)
- **File**: `frontend/src/utils/validator.js`
- **Error**: `SyntaxError: Unexpected identifier 'MAX_ALLOWED_EXPENSE'`
- **Buggy Code**:
  ```javascript
  cosnt MAX_ALLOWED_EXPENSE = 50000;
  ```
- **Correction**:
  ```javascript
  export const MAX_ALLOWED_EXPENSE = 50000;
  ```
- **Explanation**: Keyword typo `cosnt` prevents Babel/Vite from compiling the module.

---

### Bug #7: Unterminated JSX Tag (React Compile-Time JSX SyntaxError)
- **File**: `frontend/src/components/ExpenseCard.jsx`
- **Error**: `SyntaxError: Unterminated JSX contents`
- **Buggy Code**:
  ```jsx
  return (
      <div className="expense-preview-card">
          {/* ... inner elements */}
      {/* Missing closing </div> tag */}
  );
  ```
- **Correction**:
  ```jsx
  return (
      <div className="expense-preview-card">
          {/* ... inner elements */}
      </div>
  );
  ```
- **Explanation**: In JSX, every opened element `<tag>` must have an explicit closing tag `</tag>` or be self-closing `<tag />`.

---

### Bug #8: Misspelled CSS Property (Compile-Time / CSS Parse Error)
- **File**: `frontend/src/styles.css`
- **Error**: Invalid property declaration
- **Buggy Code**:
  ```css
  .stat-badge.income {
      backgroud-color: rgba(16, 185, 129, 0.2);
  }
  ```
- **Correction**:
  ```css
  .stat-badge.income {
      background-color: rgba(16, 185, 129, 0.2);
  }
  ```
- **Explanation**: `backgroud-color` is missing 'n', causing the browser stylesheet parser to discard the declaration.

---

### Bug #9: Calling `.map()` on Undefined (React Runtime TypeError)
- **File**: `frontend/src/components/TransactionList.jsx`
- **Error**: `TypeError: Cannot read properties of undefined (reading 'map')`
- **Buggy Code**:
  ```jsx
  export function TransactionList({ transactions, onDelete }) {
      return (
          <div className="table-body">
              {transactions.map(item => ( ... ))}
  ```
- **Correction**:
  ```jsx
  export function TransactionList({ transactions = [], onDelete }) {
      return (
          <div className="table-body">
              {transactions?.map(item => ( ... ))}
  ```
- **Explanation**: If `<TransactionList />` is called without `transactions`, calling `transactions.map()` throws an unhandled `TypeError`.

---

### Bug #10: Undeclared Helper `formatCurrency` (React Runtime ReferenceError)
- **File**: `frontend/src/components/SummaryCards.jsx`
- **Error**: `ReferenceError: formatCurrency is not defined`
- **Buggy Code**:
  ```jsx
  {typeof formatCurrency === 'function' ? formatCurrency(netSavings) : `$${Number(netSavings).toFixed(2)}`}
  ```
- **Correction**:
  ```jsx
  const formatCurrency = (val) => `$${Number(val).toFixed(2)}`;
  ```
- **Explanation**: Invoking a function that was neither declared locally nor imported from an external utility module raises a `ReferenceError`.