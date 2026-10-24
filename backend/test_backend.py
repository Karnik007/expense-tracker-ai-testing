"""
FinPulse — Backend AI Evaluation Test Suite
Evaluates whether the AI bug-fixing model has corrected all 5 backend errors.
"""

import unittest
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

class TestBackendCompileAndRuntimeBugs(unittest.TestCase):

    def test_bug_1_and_2_validators_syntax_compile(self):
        """
        Bug #1 & #2 (Compile-Time SyntaxError):
        Verifies that validators.py has valid Python syntax and compiles cleanly.
        """
        validators_path = os.path.join(os.path.dirname(__file__), "validators.py")
        with open(validators_path, "r", encoding="utf-8") as f:
            code = f.read()

        try:
            compile(code, validators_path, "exec")
        except SyntaxError as e:
            self.fail(f"SyntaxError in validators.py (Bug #1/#2): {e.msg} at line {e.lineno}")

    def test_bug_3_runtime_name_error_datetime(self):
        """
        Bug #3 (Runtime NameError):
        Verifies that services.py has imported datetime and does not throw NameError.
        """
        services_path = os.path.join(os.path.dirname(__file__), "services.py")
        with open(services_path, "r", encoding="utf-8") as f:
            code = f.read()

        # Check if 'datetime' is accessed but not imported
        if "datetime.datetime.now()" in code and "import datetime" not in code:
            self.fail("NameError: 'datetime' is referenced in services.py without 'import datetime'!")

    def test_bug_4_runtime_attribute_error_dict_append(self):
        """
        Bug #4 (Runtime AttributeError):
        Verifies that get_category_breakdown does not call .append() on a dict.
        """
        from models import store
        try:
            store.get_category_breakdown()
        except AttributeError as e:
            self.fail(f"AttributeError in get_category_breakdown (Bug #4): {e}")

    def test_bug_5_runtime_type_error_none_addition(self):
        """
        Bug #5 (Runtime TypeError):
        Verifies that calculate_tax_inclusive_total safely handles None tax fields.
        """
        from services import calculate_tax_inclusive_total
        # txn-2 has tax=None
        try:
            total = calculate_tax_inclusive_total("txn-2")
            self.assertIsInstance(total, (int, float))
        except TypeError as e:
            self.fail(f"TypeError in calculate_tax_inclusive_total (Bug #5): {e}")

if __name__ == "__main__":
    print("\n🧪 Running FinPulse Backend AI Benchmark Tests...\n")
    unittest.main(verbosity=2)
