import { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import axios from "axios";

export const InstagramTopPosts = ({ urlType }: { urlType: string }) => {
    const [postsLinks, setPostsLinks] = useState<string[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let url: string;

            if (urlType === "general") {
                url = "http://127.0.0.1:5000/instagram/general/toppostslinks";
            } else {
                url = "http://127.0.0.1:5000/instagram/specific/toppostslinks";
            }

            try {
                const result = await axios.get(url);
                setPostsLinks(result.data);
            } catch (error) {
                console.error("Error fetching Instagram posts:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const startIndex = (currentPageNumber - 1) * 2;
        const endIndex = startIndex + 2;
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
                    <div key={index} style={{ display: "flex", justifyContent: "center" }}>
                        {/* Embed Instagram post using iframe */}
                        <iframe
                            src={`https://www.instagram.com/p/${link.split('/')[4]}/embed`}
                            width="328"
                            height="400"
                            allow="encrypted-media"
                            title={`Instagram Post ${index + 1}`}
                        ></iframe>
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
                    disabled={currentPageNumber === 3}
                    className={`px-4 py-2 rounded-lg ${currentPageNumber === 3 ? "bg-gray-200 cursor-not-allowed" : "bg-indigo-500 text-white"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
