import json

twitterDataPathPrefix="../data/TwitterData/"
twitterTweetFilePaths={
    "general":twitterDataPathPrefix+"processed/mergedGeneralTrending.json",
    "food":twitterDataPathPrefix+"food.json",
    "art":twitterDataPathPrefix+"art.json",
    "music":twitterDataPathPrefix+"music.json",
    "sports":twitterDataPathPrefix+"sports.json",
    "tech":twitterDataPathPrefix+"technology.json"
}
def getTweets(category:str):
    if category not in twitterTweetFilePaths.keys():
        return []
    with open(twitterTweetFilePaths[category], 'r', errors='ignore',encoding='utf-8') as file:
        tweets=json.load(file)
    return tweets
    
def getTwitterTrends():
    with open(twitterDataPathPrefix+"processed/cleanedTopicTrends.json","r",errors='ignore',encoding='utf-8') as file:
        trends=json.load(file)

    return trends