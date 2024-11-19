import React, { useEffect, useState } from "react";
import { makeGeminiRequest } from "../../services/gpt";
import ReactMarkdown from "react-markdown";
import { useParams } from 'react-router-dom';
import { fetchTweets, fetchTwitterTopHashtags } from "../../services/twitterApi";

export default function ChatGPTResponse() {
    const [posts, setPosts] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [markdownContent, setMarkdownContent] = useState("");
    const [error, setError] = useState(null);

    var { socialMediaPlatform, postCategory } = useParams() || { socialMediaPlatform: 'Twitter', postCategory: 'general' };

    // Function to handle data fetching and processing
    const handleGenerate = async () => {
        setLoading(true);
        setMarkdownContent("");

        if (socialMediaPlatform === "Twitter") {
            try {
                const postsResp = await fetchTweets(postCategory);
                const sortedPosts = postsResp.sort(
                    (a, b) => parseFloat(b.popularityScore) - parseFloat(a.popularityScore)
                );
                setPosts(sortedPosts.slice(0, 5));

                const hashtagsResp = await fetchTwitterTopHashtags(postCategory);
                const sortedHashtags = Object.entries(hashtagsResp)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10)
                    .map(([name, count]) => ({ name, count: count * 1000 }));
                setHashtags(sortedHashtags);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch data. Please try again.");
            }
        }
    };

    // useEffect hook to trigger handleGenerate when component mounts
    useEffect(() => {
        handleGenerate();
    }, []); // Empty dependency array means this runs once after the component mounts

    // useEffect hook to react to posts and hashtags changes
    useEffect(() => {
        if (posts.length > 0 && hashtags.length > 0) {
            const formattedPosts = posts.map(post => post.content); // Extract post content
            const formattedHashtags = hashtags.map(({ name }) => name); // Extract hashtag names

            const fetchSuggestions = async () => {
                try {
                    const response = await makeGeminiRequest(formattedPosts, formattedHashtags, postCategory);
                    setMarkdownContent(response); // Set markdown content based on the response
                } catch (err) {
                    setError("Failed to fetch suggestions. Please try again.");
                    console.error(err);
                }
                finally {
                    setLoading(false);
                }
            };

            fetchSuggestions(); // Call the function to fetch suggestions when posts and hashtags are available
        }
    }, [posts, hashtags]); // This will run whenever posts or hashtags are updated

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="p-8 bg-blue-600 text-white">
                    <h1 className="text-4xl font-extrabold">AI Powered Suggestions</h1>
                    <p className="mt-2 text-lg">
                        Create unique trending content ideas for social media!
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    {loading && (
                        <div className="flex flex-col items-center mt-6">
                            <div className="text-blue-600 font-bold text-lg">
                                Generating suggestions...
                            </div>
                            <div className="w-10 h-10 border-4 border-blue-600 border-dashed rounded-full animate-spin mt-4"></div>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 text-red-600 font-medium text-center">
                            {error}
                        </div>
                    )}

                    {!loading && markdownContent && (
                        <div className="mt-8 bg-gray-100 shadow-md rounded-lg p-6 w-full prose prose-blue max-w-none">
                            <ReactMarkdown>{markdownContent}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


