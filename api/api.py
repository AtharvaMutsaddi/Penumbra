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

@app.route("/twitter/tophashtags",methods=["GET"])
def tophashtags():
    category = request.args.get("category")
    if not category:
        return jsonify({"error": "Category name is required"}), 400
    if category=="general":
        return jsonify(getGeneralTopHashtags()),200
    categoryTweets = getTweets(category)
    if len(categoryTweets) == 0:
        return jsonify({"error": "Category not found!"}), 404
    topHashTags=getTopHashtags(categoryTweets, 10)
    return jsonify(topHashTags),200 

@app.route("/twitter/trends",methods=["GET"])
def twittertrends():
    category = request.args.get("category")
    if not category:
        return jsonify({"error": "Category name is required"}), 400
    return jsonify(getTrends(10)), 200

@app.route("/twitter/tweetcounts",methods=["GET"])
def tweetcounts():
    """
        returns total number of tweets in the category. all categories if general is passed
    """
    category = request.args.get("category")
    if not category:
        return jsonify({"error": "Category name is required"}), 400
    return jsonify(getTweetCounts(category)), 200

@app.route("/twitter/tweets",methods=["GET"])
def tweets():
    category = request.args.get("category")
    print(category)
    if not category:
        return jsonify({"error": "Category name is required"}), 400
    return jsonify(getPosts(category)),200

if __name__ == '__main__':
    app.run(debug=True)