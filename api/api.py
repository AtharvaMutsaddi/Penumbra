from flask import Flask, abort, jsonify, request, send_file
from flask_cors import CORS
from utils.twitter import *
from utils.instagram import *
from db import *
import base64, requests, mimetypes
import json
import os
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

@app.route("/youtube/trendingvideos", methods=["GET"])
def trendingvideos():
    category = request.args.get("category")  
    try:
        if category:
            file_path = f"../data/YouTube data/processed/top_videos_category_{category}.json"
            with open(file_path, "r") as file:
                videos = json.load(file)
        else:   
            file_path = "../data/YouTube data/processed/trending_videos.json"
            with open(file_path, "r") as file:
                videos = json.load(file)
        return jsonify(videos), 200

    except FileNotFoundError:
        abort(404, description=f"Category '{category}' not found.")

@app.route("/youtube/topsearches", methods=["GET"])
def topsearches():
    file_path = "../data/YouTube data/processed/top_searches.json"
    with open(file_path, "r") as file:
        videos = json.load(file)
    return jsonify(videos), 200

@app.route("/youtube/topchannels", methods=["GET"])
def topchannels():
    file_path = "../data/YouTube data/processed/channel_data.json"
    with open(file_path, "r") as file:
        channels = json.load(file)
    return jsonify(channels), 200

@app.route("/youtube/comments", methods=["GET"])
def comments():
    videoId = request.args.get("videoId") 
    file_path = "../data/YouTube data/processed/comments_data.json"
    with open(file_path, "r", encoding="utf-8") as file:
        comments_data = json.load(file)
    if videoId in comments_data:
        return jsonify(comments_data[videoId]["comments"])
    else:
        return jsonify({"error": "Video ID not found"}), 404
    
@app.route("/youtube/wordcloud", methods=["GET"])
def wordcloud():
    videoId = request.args.get("videoId")
    print(videoId)
    file_path = f"../data/YouTube data/processed/wordclouds/wordcloud_{videoId}.png"
    if os.path.exists(file_path):
        return send_file(file_path, mimetype='image/png')
    else:
        return jsonify({"error": "Word cloud image not found"}), 404
    
@app.route("/youtube/sentimentanalysis", methods=["GET"])
def sentiments():
    videoId = request.args.get("videoId")
    print(videoId)
    file_path = "../data/YouTube data/processed/comments_data.json"
    with open(file_path, "r", encoding="utf-8") as file:
        comments_data = json.load(file)
    if videoId in comments_data:
        return jsonify(comments_data[videoId]["summary"])
    else:
        return jsonify({"error": "Video ID not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)
