import os

from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
def index() -> str:
    api_base_url = os.getenv("API_BASE_URL", "http://127.0.0.1:8000")
    return render_template("index.html", api_base_url=api_base_url)


if __name__ == "__main__":
    host = os.getenv("FRONTEND_HOST", "127.0.0.1")
    port = int(os.getenv("FRONTEND_PORT", "5000"))
    app.run(host=host, port=port, debug=True)