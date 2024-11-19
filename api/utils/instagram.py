from db import *
import pandas as pd


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


def getInstagramTopCreators(input_category: str) -> list:
    ls = []

    if input_category == "general":
        for category in os.listdir(instagramDataPathPrefix):
            curr = getInstagramCreatorsInfo(category)
            curr = [{**item, "category": category} for item in curr]
            ls.extend(curr)
    else:
        ls = getInstagramCreatorsInfo(input_category)
        ls = [{**item, "category": input_category} for item in ls]

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

    if input_category == "general":
        return ls[0:3:1]
    else:
        return ls[0:5:1]


def getInstagramTopHashtags(input_category: str) -> dict:
    ans = {}

    if input_category == "general":
        for category in os.listdir(instagramDataPathPrefix):
            curr = getInstagramHashTagAnalytics(category)["hashtag_table"]
            ans.update(curr)
            return dict(
                sorted(ans.items(), key=lambda item: item[1], reverse=True)[0:6:1]
            )
    else:
        ans = getInstagramHashTagAnalytics(input_category)["hashtag_table"]
        return dict(sorted(ans.items(), key=lambda item: item[1], reverse=True))


def getInstagramTimeDistribution(input_category: str) -> dict:
    ans = []

    if input_category == "general":
        for category in os.listdir(instagramDataPathPrefix):
            ans.extend(getInstagramPosts(category))
    else:
        ans = getInstagramPosts(input_category)

    df = pd.DataFrame(ans)
    return (df["timesegment"].value_counts()).to_dict()


def getInstagramTopPostsLinks(input_category: str) -> list:
    ans = []

    if input_category == "general":
        for category in os.listdir(instagramDataPathPrefix):
            ans.extend(getInstagramPosts(category))
    else:
        ans = getInstagramPosts(input_category)

    ans = sorted(
        ans,
        key=lambda x: (x.get("likesCount", 0) or 0, x.get("commentsCount", 0) or 0),
        reverse=True,
    )

    if input_category == "general":
        return [item["url"] for item in ans[0:5:1]]
    else:
        return [item["url"] for item in ans[0:20:1]]
