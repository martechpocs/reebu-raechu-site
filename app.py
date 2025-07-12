from flask import Flask, request, make_response, send_from_directory
import uuid
from datetime import datetime, timedelta
import os

app = Flask(__name__, static_folder='static')

@app.before_request
def ensure_fpid_cookie():
    cookie_name = "FPID"
    fpid = request.cookies.get(cookie_name)

    if not fpid:
        fpid = str(uuid.uuid4())
        expires = datetime.utcnow() + timedelta(days=30*13)  # 13 months
        resp = make_response()
        resp.set_cookie(
            cookie_name,
            fpid,
            expires=expires,
            secure=False,
            samesite="Lax"
        )
        return resp

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == "__main__":
    app.run(debug=True)