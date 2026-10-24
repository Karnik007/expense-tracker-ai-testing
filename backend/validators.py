"""
FinPulse — Expense Input Validators
Intentional Compile-Time Syntax Errors:
  - Bug #1: Missing colon ':' at the end of def validate_expense header
  - Bug #2: Typo 'exceppt' instead of 'except' in try-except block
"""

# BUG #1 (Intentional Compile-Time SyntaxError):
# Missing colon ':' at the end of the function definition line!
# Python compiler raises: SyntaxError: expected ':'
def validate_expense(payload)
    if not payload or not isinstance(payload, dict):
        return False, "Payload must be a dictionary"

    title = payload.get("title")
    if not title or not isinstance(title, str) or len(title.strip()) < 2:
        return False, "Title must be at least 2 characters"

    # BUG #2 (Intentional Compile-Time SyntaxError):
    # Typo in keyword 'exceppt' instead of 'except'.
    # Python compiler raises: SyntaxError: invalid syntax
    try:
        amount = float(payload.get("amount", 0))
        if amount <= 0:
            return False, "Amount must be greater than zero"
    exceppt ValueError:
        return False, "Amount must be a valid numeric float"

    category = payload.get("category", "General")
    valid_categories = ["Housing", "Food", "Transportation", "Utilities", "Entertainment", "Income", "General"]
    if category not in valid_categories:
        return False, f"Category must be one of {valid_categories}"

    return True, None