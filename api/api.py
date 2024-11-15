from flask import Flask, jsonify, request
from flask_cors import CORS
from utils.twitter import *
from db import *
app = Flask(__name__)
CORS(app)

@app.route("/twitter/topcreators", methods=["GET"])
def topcreators():
    category = request.args.get("category")
    if not category:
        return jsonify({"error": "Category name is required"}), 400
    
    categoryTweets = getTweets(category)
    if len(categoryTweets) == 0:
        return jsonify({"error": "Category not found!"}), 404
    
    topCreators = getTopCreators(categoryTweets, 5)
    
    # Return the sorted list directly
    return jsonify(topCreators), 200

if __name__ == '__main__':
    app.run(debug=True)