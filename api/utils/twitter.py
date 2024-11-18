# def getTopCreators(tweetList: list, n: int):
#     creatorCounts = dict()

#     # Populate the dictionary
#     for tweet in tweetList:
#         creator = tweet['author']['userName']
#         if creator not in creatorCounts:
#             creatorCounts[creator] = 0
#         creatorCounts[creator] += 1

#     # Sort the dictionary by count in descending order
#     sortedCreatorCounts = sorted(creatorCounts.items(), key=lambda item: item[1], reverse=True)

#     # Return the top 'n' items as a list of tuples
#     return sortedCreatorCounts[:n]
from db import *
def getTopCreators(tweetList: list, n: int, country="None"):
    creatorData = {}

    for tweet in tweetList:
        author = tweet['author']
        creator = author['userName']
        url = author['url']
        profilePicture = author['profilePicture']
        followers = author['followers']
        name=author["name"]
        if creator not in creatorData:
            creatorData[creator] = {
                'count': 0, 
                'url': url, 
                'profile picture': profilePicture, 
                'followers': followers,
                'name':name
            }
        creatorData[creator]['count'] += 1

    # Sort the dictionary by count in descending order
    sortedCreatorData = sorted(creatorData.items(), key=lambda item: item[1]['count'], reverse=True)

    # Get the top n creators
    top_n = {creator: data for creator, data in sortedCreatorData[:n]}
    return top_n


def getTopHashtags(tweetList: list, n: int):
    hashtagCounts = dict()

    for tweet in tweetList:
        hashtags = []

        # Collect hashtags from 'entities.hashtags'
        if 'entities' in tweet and 'hashtags' in tweet['entities']:
            hashtags.extend([hashtag['text'].lower() for hashtag in tweet['entities']['hashtags']])

        # Collect hashtags from 'profile_bio.description'
        if 'author' in tweet and 'profile_bio' in tweet['author']:
            bio = tweet['author']['profile_bio']
            if 'description' in bio and 'hashtags' in bio.get('entities', {}).get('description', {}):
                hashtags.extend([hashtag['text'].lower() for hashtag in bio['entities']['description']['hashtags']])

        for tag in hashtags:
            if tag not in hashtagCounts:
                hashtagCounts[tag] = 0
            hashtagCounts[tag] += 1

    sortedHashtagCounts = sorted(hashtagCounts.items(), key=lambda item: item[1], reverse=True)
    top_n = dict(sortedHashtagCounts[:n])
    return top_n

def getGeneralTopHashtags():
    hashtags = {}

    # Helper to update hashtag counts
    def updateHashtags(categoryHashtags):
        for tag, count in categoryHashtags.items():
            if tag not in hashtags:
                hashtags[tag] = 0
            hashtags[tag] += count

    # Fetch and update hashtags for each category
    categories = ["food", "art", "tech", "sports", "music", "general"]
    for category in categories:
        tweets = getTweets(category)  
        topHashtags = getTopHashtags(tweets, 3) 
        updateHashtags(topHashtags)

    # Sort hashtags by count in descending order
    sortedHashtags = dict(sorted(hashtags.items(), key=lambda item: item[1], reverse=True))
    return sortedHashtags

def getTrends(n:int):
    return getTwitterTrends()[:n]

def getTweetCounts(category:str):
    categories={category:0}
    if category=="general":
        categories={x:0 for x in twitterTweetFilePaths.keys()}
    for cat in categories:
        count=len(getTweets(cat))
        categories[cat]=count
    return categories

def getPosts(category:str):
    categories=[category]
    if category=="general":
        categories=twitterTweetFilePaths.keys()
    tweetList=[]
    for cat in categories:
        tweets= getTweets(cat)
        for tweet in tweets:
            processedTweet={
                "id":tweet["id"],
                "content":tweet["text"],
                "url":tweet["url"],
                "retweetCount": tweet["retweetCount"],
                "replyCount": tweet["replyCount"],
                "likeCount": tweet["likeCount"],
                "viewCount": tweet["viewCount"],
                "createdAt":tweet["createdAt"],
                "authorName":tweet["author"]["name"],
                "authorProfilePicture":tweet["author"]['profilePicture'],
                "authorUsername":tweet["author"]["userName"],
                "authorURL":tweet["author"]["url"],
                "authorXVerification":tweet["author"]["isBlueVerified"],
                "authorTwitterVerification": tweet["author"]["isVerified"],
                "followers":tweet["author"]["followers"],
                "hashtags": tweet["entities"]["hashtags"] if "entities" in tweet and "hashtags" in tweet["entities"] else [],
                "popularityScore":(tweet["retweetCount"]+tweet["replyCount"]+tweet["likeCount"]+tweet["viewCount"])/4
            }
            tweetList.append(processedTweet)

        sortedTweets=sorted(tweetList, key=lambda tweet: tweet["popularityScore"], reverse=True)
        return sortedTweets[:50]
