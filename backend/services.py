"""
FinPulse — Analytics and Calculations Service
Intentional Runtime Errors:
  - Bug #3: NameError: name 'datetime' is not defined
  - Bug #5: TypeError: unsupported operand type(s) for +: 'float' and 'NoneType'
"""

from models import store

def calculate_financial_summary():
    """
    Computes total income, expenses, net savings, and category distribution
    """
    txns = store.get_all()
    total_income = sum(t["amount"] for t in txns if t["type"] == "income")
    total_expenses = sum(t["amount"] for t in txns if t["type"] == "expense")
    net_savings = total_income - total_expenses
    savings_rate = round((net_savings / total_income * 100), 1) if total_income > 0 else 0.0

    return {
        "totalIncome": total_income,
        "totalExpenses": total_expenses,
        "netSavings": net_savings,
        "savingsRate": savings_rate,
        "transactionCount": len(txns)
    }

def record_timestamped_expense(data):
    """
    Adds a new expense with a system timestamp.
    """
    # BUG #3 (Intentional Runtime NameError):
    # 'datetime' module is used here without having been imported!
    # Python raises: NameError: name 'datetime' is not defined
    try:
        timestamp = datetime.datetime.now().isoformat()
    except NameError as e:
        print(f"[Runtime NameError Bug #3 Detected]: {e}")
        timestamp = "2026-10-24T12:00:00"

    data["createdAt"] = timestamp
    return store.add(data)

def calculate_tax_inclusive_total(txn_id):
    """
    Calculates total amount including tax for a given transaction.
    """
    txn = store.get_by_id(txn_id)
    if not txn:
        return 0.0

    # BUG #5 (Intentional Runtime TypeError):
    # txn['tax'] is None for rent and subscription transactions!
    # Python raises: TypeError: unsupported operand type(s) for +: 'float' and 'NoneType'
    try:
        total_with_tax = txn["amount"] + txn["tax"]
        return total_with_tax
    except TypeError as e:
        print(f"[Runtime TypeError Bug #5 Detected]: {e}")
        raise e
