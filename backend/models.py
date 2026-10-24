"""
FinPulse — Expense Data Store Models
Intentional Runtime Error:
  - Bug #4: AttributeError: 'dict' object has no attribute 'append'
"""

class ExpenseStore:
    def __init__(self):
        self.transactions = [
            {
                "id": "txn-1",
                "title": "Monthly Salary",
                "amount": 4500.00,
                "type": "income",
                "category": "Income",
                "date": "2026-10-01",
                "tax": 0.0
            },
            {
                "id": "txn-2",
                "title": "Apartment Rent",
                "amount": 1450.00,
                "type": "expense",
                "category": "Housing",
                "date": "2026-10-03",
                "tax": None  # Triggers Bug #5 if accessed without null-check
            },
            {
                "id": "txn-3",
                "title": "Supermarket Groceries",
                "amount": 285.50,
                "type": "expense",
                "category": "Food",
                "date": "2026-10-08",
                "tax": 14.25
            },
            {
                "id": "txn-4",
                "title": "Cloud Hosting & Subscriptions",
                "amount": 65.00,
                "type": "expense",
                "category": "Utilities",
                "date": "2026-10-14",
                "tax": None
            },
            {
                "id": "txn-5",
                "title": "Freelance Web Design",
                "amount": 1200.00,
                "type": "income",
                "category": "Income",
                "date": "2026-10-18",
                "tax": 0.0
            }
        ]
        self._next_id = 6

    def get_all(self):
        return list(self.transactions)

    def get_by_id(self, txn_id):
        return next((t for t in self.transactions if t["id"] == txn_id), None)

    def add(self, data):
        new_item = {
            "id": f"txn-{self._next_id}",
            "title": data.get("title", "Untitled").strip(),
            "amount": float(data.get("amount", 0)),
            "type": data.get("type", "expense"),
            "category": data.get("category", "General"),
            "date": data.get("date", "2026-10-24"),
            "tax": data.get("tax", None)
        }
        self._next_id += 1
        self.transactions.append(new_item)
        return new_item

    def get_category_breakdown(self):
        breakdown = {}
        for t in self.transactions:
            if t["type"] == "expense":
                cat = t["category"]
                breakdown[cat] = breakdown.get(cat, 0) + t["amount"]

        # BUG #4 (Intentional Runtime AttributeError):
        # 'breakdown' is a Python dict, but code attempts to call '.append()' on it!
        # Python raises: AttributeError: 'dict' object has no attribute 'append'
        try:
            breakdown.append({"total_categories": len(breakdown)})
        except AttributeError as err:
            # We catch it here for graceful runtime degradation if needed
            print(f"[Runtime AttributeError Bug #4 Detected]: {err}")
            raise err

        return breakdown

store = ExpenseStore()
