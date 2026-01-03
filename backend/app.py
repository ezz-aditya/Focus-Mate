from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from model import predict_difficulty


load_dotenv()

app = Flask(__name__)
CORS(app)

PORT = int(os.getenv("FLASK_PORT", 5000))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    confidence = data.get("confidence")
    score = data.get("score", 50)

    # Safety checks
    if confidence is None:
        return jsonify({"error": "confidence is required"}), 400

    difficulty = predict_difficulty(confidence, score)

    return jsonify({
        "difficulty": difficulty
    })

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=PORT,
        debug=True
    )
