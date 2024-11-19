from flask import Flask, jsonify, request
from flask_cors import CORS
from utils.twitter import *
from utils.instagram import *
from db import *
import base64, requests, mimetypes

app = Flask(__name__)
CORS(app)


def encode_image_from_url(image_url):
    if image_url == None:
        return encode_image_from_url(
            "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
        )

    response = requests.get(image_url)

    if response.status_code == 200:
        image_data = response.content
        mime_type, _ = mimetypes.guess_type(image_url)

        if not mime_type:
            mime_type = "image/jpeg"

        encoded_string = base64.b64encode(image_data).decode("utf-8")

        return mime_type, encoded_string
    else:
        return encode_image_from_url(
            "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
        )


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


@app.route("/twitter/tophashtags", methods=["GET"])
def tophashtags():
    category = request.args.get("category")
    if not category:
        return jsonify({"error": "Category name is required"}), 400
    if category == "general":
        return jsonify(getGeneralTopHashtags()), 200
    categoryTweets = getTweets(category)
    if len(categoryTweets) == 0:
        return jsonify({"error": "Category not found!"}), 404
    topHashTags = getTopHashtags(categoryTweets, 10)
    return jsonify(topHashTags), 200


@app.route("/twitter/trends", methods=["GET"])
def twittertrends():
    category = request.args.get("category")
    if not category:
        return jsonify({"error": "Category name is required"}), 400
    return jsonify(getTrends(10)), 200


@app.route("/twitter/tweetcounts", methods=["GET"])
def tweetcounts():
    """
    returns total number of tweets in the category. all categories if general is passed
    """
    category = request.args.get("category")
    if not category:
        return jsonify({"error": "Category name is required"}), 400
    return jsonify(getTweetCounts(category)), 200


@app.route("/twitter/tweets", methods=["GET"])
def tweets():
    category = request.args.get("category")
    print(category)
    if not category:
        return jsonify({"error": "Category name is required"}), 400
    return jsonify(getPosts(category)), 200


@app.route("/instagram/general/categorystatistics", methods=["GET"])
def instagramgeneralcategorystatistics():
    mp = getInstagramGeneralCategoryStatistics()
    ans = [{"name": key.capitalize(), "count": value} for key, value in mp.items()]
    return jsonify(ans), 200


@app.route("/instagram/topcreators", methods=["GET"])
def instagramtopcreators():
    category = request.args.get("category")
    ans = getInstagramTopCreators(category)

    for item in ans:
        mime_type, encoded_image = encode_image_from_url(item["profilePicUrl"])
        if encoded_image:
            item["profilePicUrl"] = f"data:{mime_type};base64,{encoded_image}"
        else:
            item["profilePicUrl"] = None

    return jsonify(ans), 200


@app.route("/instagram/tophashtags", methods=["GET"])
def instagramtophashtags():
    category = request.args.get("category")
    mp = getInstagramTopHashtags(category)

    ans = [{"text": key, "value": value} for key, value in mp.items()]

    return jsonify(ans), 200


@app.route("/instagram/categorypopularity", methods=["GET"])
def instagramcategorypopularity():
    category = request.args.get("category")
    return jsonify(getInstagramHashTagAnalytics(category)["stats"]), 200


@app.route("/instagram/toppostslinks", methods=["GET"])
def instagramtoppostslinks():
    category = request.args.get("category")
    return jsonify(getInstagramTopPostsLinks(category)), 200


@app.route("/instagram/timedistribution", methods=["GET"])
def instagramtimedistribution():
    category = request.args.get("category")
    mp = getInstagramTimeDistribution(category)
    ans = [{"name": key, "count": value} for key, value in mp.items()]
    return jsonify(ans), 200


if __name__ == "__main__":
    app.run(debug=True)
