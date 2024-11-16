import React from 'react';
import { MessageCircle, Heart, Repeat2 } from 'lucide-react';

const tweets = [
  {
    author: "Tech Innovator",
    handle: "@techinnovator",
    content: "Just launched our new AI model that can generate music from text descriptions! 🎵 #AI #Music",
    likes: 52400,
    retweets: 12300,
    replies: 3400,
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60"
  },
  {
    author: "Space Explorer",
    handle: "@spaceexplorer",
    content: "Breaking: New images from James Webb telescope reveal unprecedented details of distant galaxies ✨🔭 #Space #Astronomy",
    likes: 48900,
    retweets: 15600,
    replies: 2800,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60"
  }
];

export default function TopTweets() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Top Tweets</h2>
      <div className="space-y-6">
        {tweets.map((tweet, index) => (
          <div key={index} className="border rounded-xl p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={tweet.avatar} 
                alt={tweet.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{tweet.author}</h3>
                <p className="text-sm text-gray-500">{tweet.handle}</p>
              </div>
            </div>
            <p className="text-gray-800 mb-4">{tweet.content}</p>
            <div className="flex items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{tweet.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Repeat2 className="w-4 h-4" />
                <span className="text-sm">{tweet.retweets.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{tweet.replies.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}