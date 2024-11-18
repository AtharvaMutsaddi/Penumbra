import { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import axios from "axios";

export const InstagramTopPosts = ({ category, n }: { category: string, n: number }) => {
    const [postsLinks, setPostsLinks] = useState<string[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://127.0.0.1:5000/instagram/toppostslinks", { params: { "category": category } });
                setPostsLinks(result.data);
                setCurrentPageNumber(1);
                console.log(result.data[0].split('/')[4])
            } catch (error) {
                console.error("Error fetching Instagram posts:", error);
            }
        };

        fetchData();
    }, [category, n]);

    useEffect(() => {
        const startIndex = (currentPageNumber - 1);
        const endIndex = currentPageNumber;
        setCurrentPage(postsLinks.slice(startIndex, endIndex));
    }, [postsLinks, currentPageNumber]);

    const handlePageChange = (page: number) => {
        setCurrentPageNumber(page);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
                <Instagram className="w-5 h-5 text-pink-500" />
                <h2 className="text-xl font-bold"> Top Posts</h2>
            </div>

            <div className="space-y-6 insta-posts">
                {currentPage.map((link, index) => (
                    <div key={index} className="flex justify-center p-2 border border-gray-200 rounded-lg">
                        {/* Embed Instagram post using iframe */}
                        <iframe
                            src={`https://www.instagram.com/p/${link.split('/')[4]}/embed/?utm_source=ig_web_copy_link`}
                            width="400px"
                            height="650px"
                        >
                        </iframe>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => handlePageChange(currentPageNumber - 1)}
                    disabled={currentPageNumber === 1}
                    className={`px-4 py-2 rounded-lg ${currentPageNumber === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-indigo-500 text-white"}`}
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPageNumber + 1)}
                    disabled={currentPageNumber === n}
                    className={`px-4 py-2 rounded-lg ${currentPageNumber === n ? "bg-gray-200 cursor-not-allowed" : "bg-indigo-500 text-white"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
