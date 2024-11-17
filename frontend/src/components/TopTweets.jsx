import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Repeat2, ViewIcon } from 'lucide-react';
import { fetchTweets } from '../../services/twitterApi';

function formatNumber(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
  return num.toString();
}

export default function TopTweets(props) {
  const [tweets, setTweets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tweetsPerPage = 3;

  const fetchData = async () => {
    try {
      const resp = await fetchTweets(props.category);
      const sortedData = resp.sort(
        (a, b) => parseFloat(b.popularityScore) - parseFloat(a.popularityScore)
      );
      setTweets(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pagination
  const totalPages = Math.ceil(tweets.length / tweetsPerPage);
  const paginatedTweets = tweets.slice(
    (currentPage - 1) * tweetsPerPage,
    currentPage * tweetsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Top Tweets</h2>
      <div className="space-y-6">
        {paginatedTweets.map((tweet, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={tweet.authorProfilePicture}
                alt={tweet.authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{tweet.authorName}</h3>
                <p className="text-sm text-gray-500">@{tweet.authorUsername}</p>
              </div>
            </div>
            <p className="text-gray-800 mb-4">
              {tweet.content.slice(0, 140)}
              <a href={tweet.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                [...] Read more
              </a>
            </p>
            <div className="flex items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm">{formatNumber(tweet.likeCount)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Repeat2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">{formatNumber(tweet.retweetCount)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <span className="text-sm">{formatNumber(tweet.replyCount)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ViewIcon className="w-5 h-5 text-gray-700" />
                <span className="text-sm">{formatNumber(tweet.viewCount)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-indigo-500 text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-indigo-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
TopTweets.defaultProps={
  category:"general"
}