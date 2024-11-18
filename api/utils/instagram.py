from db import *
import pandas as pd


def getInstagramGeneralTopCreators() -> list:
    ls = []
    for category in os.listdir(instagramDataPathPrefix):
        curr = getInstagramTop10Creators(category)
        curr = [{**item, "category": category} for item in curr]
        ls.extend(curr)

    ls = sorted(ls, key=lambda x: x.get("postsCount"), reverse=True)
    fields_to_select = [
        "category",
        "fullName",
        "postsCount",
        "profilePicUrl",
        "url",
        "username",
    ]
    ls = [{key: d[key] for key in fields_to_select if key in d} for d in ls]

    return ls[0:3:1]


def getInstagramGeneralTopHashtags() -> dict:
    ans = {}
    for category in os.listdir(instagramDataPathPrefix):
        curr = getInstagramHashTagAnalytics(category)["hashtag_table"]
        ans.update(curr)

    return dict(sorted(ans.items(), key=lambda item: item[1], reverse=True)[0:6:1])


def getInstagramGeneralCategoryStatistics() -> dict:
    ans = {}
    for category in os.listdir(instagramDataPathPrefix):
        ans[category] = int(
            getInstagramHashTagAnalytics(category)["stats"][0]
            .split(":")[-1]
            .strip()
            .replace(",", "")
        )

    return dict(sorted(ans.items(), key=lambda item: item[1], reverse=True))


def getInstagramGeneralTimeDistribution() -> dict:
    ans = []
    for category in os.listdir(instagramDataPathPrefix):
        ans.extend(getInstagramPosts(category))

    df = pd.DataFrame(ans)
    return (df["timesegment"].value_counts()).to_dict()


def getInstagramGeneralTopPostsLinks() -> list:
    ans = []
    for category in os.listdir(instagramDataPathPrefix):
        ans.extend(getInstagramPosts(category))

    ans = sorted(
        ans,
        key=lambda x: (x.get("likesCount", 0) or 0, x.get("commentsCount", 0) or 0),
        reverse=True,
    )

    return [item["url"] for item in ans[0:6:1]]


def getInstagramTopHashTags(category: str) -> dict:
    if category in os.listdir(instagramDataPathPrefix):
        return getInstagramHashTagAnalytics(category)["hashtag_table"]
    else:
        return {}


def getInstagramStats(category: str) -> dict:
    if category in os.listdir(instagramDataPathPrefix):
        ls = getInstagramHashTagAnalytics(category)["stats"]
        return {
            item.split(":")[0].strip(): int(item.split(":")[1].strip().replace(",", ""))
            for item in ls
        }
    else:
        return {}
