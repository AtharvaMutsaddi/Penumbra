def getTopCreators(tweetList: list, n: int):
    creatorCounts = dict()

    # Populate the dictionary
    for tweet in tweetList:
        creator = tweet['author']['userName']
        if creator not in creatorCounts:
            creatorCounts[creator] = 0
        creatorCounts[creator] += 1

    # Sort the dictionary by count in descending order
    sortedCreatorCounts = sorted(creatorCounts.items(), key=lambda item: item[1], reverse=True)

    # Return the top 'n' items as a list of tuples
    return sortedCreatorCounts[:n]