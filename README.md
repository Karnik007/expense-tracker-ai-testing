# 💳 FinPulse — Fullstack React & Python AI Benchmark Suite

> **A modern personal finance & expense tracking platform built with React 18 frontend and Python Flask backend, featuring 10 deliberate compile-time and runtime errors for benchmarking AI code repair systems.**

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/Karnik007/expense-tracker-ai-testing)
[![Tech Stack](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61dafb?logo=react)](https://github.com/Karnik007/expense-tracker-ai-testing)
[![Backend](https://img.shields.io/badge/Backend-Python%203%20%7C%20Flask-3776ab?logo=python)](https://github.com/Karnik007/expense-tracker-ai-testing)
[![Benchmark](https://img.shields.io/badge/Benchmark-10%20Strict%20Errors-purple)](#error-summary)

---

## 🎯 Benchmark Objective

FinPulse avoids subjective domain logic errors and focuses exclusively on **formal language parser and execution errors**:
- **Compile-Time & Syntax Errors**: AST compilation errors, Python indentation/colon errors, unclosed JSX elements, and keyword typos (`cosnt`, `exceppt`).
- **Runtime Exceptions**: Explicit `TypeError`, `NameError`, `AttributeError`, and `ReferenceError`.
- **Automated Verification**: Integrated test suites for both Python (`backend/test_backend.py`) and React (`frontend/frontend_tests.html`).

---

## 📁 Repository Structure

```
expense-tracker-ai-testing/
├── backend/                   # Python Flask REST API
│   ├── app.py                 # Flask server + native zero-dependency HTTP fallback
│   ├── models.py              # In-memory store (Contains Runtime AttributeError #4)
│   ├── services.py            # Analytics service (Contains Runtime NameError #3, TypeError #5)
│   ├── validators.py          # Input validation (Contains Compile SyntaxErrors #1, #2)
│   ├── test_backend.py        # Python unittest evaluation suite
│   └── requirements.txt       # Flask, pytest dependencies
│
├── frontend/                  # React 18 Application
│   ├── package.json           # React, Vite dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── index.html             # React entry host
│   ├── frontend_tests.html    # In-browser test runner
│   ├── frontend_tests.js      # React evaluation assertions
│   └── src/
│       ├── main.jsx           # React DOM root entry
│       ├── App.jsx            # State & layout manager
│       ├── styles.css         # Modern glassmorphic styles (Contains CSS Syntax Error #8)
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── SummaryCards.jsx     # Contains Runtime ReferenceError #10
│       │   ├── TransactionList.jsx  # Contains Runtime TypeError #9
│       │   ├── ExpenseCard.jsx      # Contains Compile JSX SyntaxError #7
│       │   └── AddExpenseModal.jsx
│       └── utils/
│           └── validator.js         # Contains Compile SyntaxError #6
│
├── requirements.txt           # Master Python dependencies for AI testing environment
├── bugs.md                    # Ground Truth Solution Key
└── README.md                  # Project documentation
```

---

## 🚀 How to Run

### 1. Backend (Python)
```bash
cd backend
python -m pip install -r requirements.txt  # Optional: runs in native mode without pip
python app.py
```
The API starts on `http://localhost:5001`.

To evaluate backend bug corrections:
```bash
python test_backend.py
```

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
Or open `frontend/frontend_tests.html` directly in any web browser to execute client-side assertions.

---

## 🐞 Error Summary

| ID | Stack | Type | Target File | Description |
|---|---|---|---|---|
| **1** | Python | SyntaxError | `backend/validators.py` | Missing colon `:` in `def validate_expense(payload)` |
| **2** | Python | SyntaxError | `backend/validators.py` | Typo in keyword `exceppt ValueError:` |
| **3** | Python | NameError | `backend/services.py` | Undeclared module `datetime.datetime.now()` |
| **4** | Python | AttributeError | `backend/models.py` | Calling `.append()` on a dictionary |
| **5** | Python | TypeError | `backend/services.py` | Adding float to `None` in `amount + tax` |
| **6** | React | SyntaxError | `frontend/src/utils/validator.js` | Keyword typo `cosnt MAX_ALLOWED_EXPENSE` |
| **7** | React | JSX Syntax | `frontend/src/components/ExpenseCard.jsx` | Unterminated JSX contents (missing `</div>`) |
| **8** | React | CSS Syntax | `frontend/src/styles.css` | Typo `backgroud-color` in `.stat-badge.income` |
| **9** | React | TypeError | `frontend/src/components/TransactionList.jsx` | Calling `.map()` on `undefined` |
| **10**| React | ReferenceError| `frontend/src/components/SummaryCards.jsx` | Undeclared function `formatCurrency` |

Complete solutions and diffs are documented in [bugs.md](bugs.md).

---

## 📄 License
MIT License. Created for AI code-correction and automated repair experiments.