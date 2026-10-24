"""
FinPulse — Python Flask REST API
"""

import json
from models import store
from services import (
    calculate_financial_summary, 
    record_timestamped_expense,
    calculate_tax_inclusive_total
)

# Safe import of validators to catch Compile-Time SyntaxErrors
validator_error = None
try:
    import validators
except SyntaxError as e:
    validator_error = f"{e.__class__.__name__}: {e.msg} at line {e.lineno}"
    print(f"⚠️ [Compile-Time SyntaxError in validators.py]: {validator_error}")

try:
    from flask import Flask, request, jsonify
    from flask_cors import CORS
    has_flask = True
except ImportError:
    has_flask = False

PORT = 5001

if has_flask:
    app = Flask(__name__)
    CORS(app)

    @app.route("/api/summary", methods=["GET"])
    def get_summary():
        summary = calculate_financial_summary()
        return jsonify({"success": True, "data": summary})

    @app.route("/api/expenses", methods=["GET"])
    def get_expenses():
        category = request.args.get("category")
        txns = store.get_all()
        if category:
            txns = [t for t in txns if t["category"].lower() == category.lower()]
        return jsonify({"success": True, "count": len(txns), "data": txns})

    @app.route("/api/expenses", methods=["POST"])
    def create_expense():
        payload = request.get_json(silent=True) or {}
        new_txn = record_timestamped_expense(payload)
        return jsonify({"success": True, "data": new_txn}), 201

    @app.route("/api/expenses/<txn_id>/total", methods=["GET"])
    def get_total_with_tax(txn_id):
        try:
            total = calculate_tax_inclusive_total(txn_id)
            return jsonify({"success": True, "total": total})
        except TypeError as e:
            return jsonify({"success": False, "error": str(e), "errorType": "TypeError"}), 500

    @app.route("/api/categories", methods=["GET"])
    def get_categories():
        try:
            breakdown = store.get_category_breakdown()
            return jsonify({"success": True, "data": breakdown})
        except AttributeError as e:
            return jsonify({"success": False, "error": str(e), "errorType": "AttributeError"}), 500

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({
            "status": "healthy",
            "framework": "Flask",
            "validatorError": validator_error
        })

    if __name__ == "__main__":
        print(f"🚀 FinPulse Backend running at http://localhost:{PORT}")
        app.run(port=PORT, debug=True)

else:
    # Zero-dependency standard library HTTP Server fallback
    from http.server import HTTPServer, BaseHTTPRequestHandler
    from urllib.parse import urlparse, parse_qs

    class NativeRequestHandler(BaseHTTPRequestHandler):
        def _set_headers(self, status=200):
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.end_headers()

        def do_OPTIONS(self):
            self._set_headers(200)

        def do_GET(self):
            parsed = urlparse(self.path)
            if parsed.path == "/api/summary":
                self._set_headers(200)
                self.wfile.write(json.dumps({"success": True, "data": calculate_financial_summary()}).encode())
            elif parsed.path == "/api/expenses":
                self._set_headers(200)
                self.wfile.write(json.dumps({"success": True, "data": store.get_all()}).encode())
            elif parsed.path == "/api/health":
                self._set_headers(200)
                self.wfile.write(json.dumps({"status": "healthy", "validatorError": validator_error}).encode())
            else:
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": "Not Found"}).encode())

    if __name__ == "__main__":
        server = HTTPServer(("0.0.0.0", PORT), NativeRequestHandler)
        print(f"🚀 FinPulse (Native Python Server) running on http://localhost:{PORT}")
        server.serve_forever()
