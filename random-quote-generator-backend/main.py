from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "mensaje": "Hello World",
        "status": "Success"
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
