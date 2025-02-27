from flask import Flask, jsonify, request
import configparser
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
config = configparser.ConfigParser()
config.read("random-quote-generator.properties")

API_KEY = config.get("DEFAULT", "API_KEY")

genai.configure(api_key=API_KEY)

@app.route('/get-quote', methods=['POST'])
def get_happy_quote():
    quote_type = request.get_json().get("type")
    model = genai.GenerativeModel(model_name="gemini-2.0-flash")

    quote = model.generate_content("Generate one random {} phrase".format(quote_type)).text[0:-1]
    return jsonify({ "quote": quote })

if __name__ == '__main__':
    app.run(host="localhost", port=8080 ,debug=True)
