import React from 'react';
import { Hash } from 'lucide-react';

const hashtags = [
  { tag: "AI", count: 1234567 },
  { tag: "Technology", count: 987654 },
  { tag: "Innovation", count: 876543 },
  { tag: "Future", count: 765432 },
  { tag: "Digital", count: 654321 }
];

export default function TopHashtags() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Hash className="w-5 h-5 text-green-500" />
        <h2 className="text-xl font-bold">Top Hashtags</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {hashtags.map((hashtag, index) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <p className="text-green-500 font-bold">#{hashtag.tag}</p>
            <p className="text-sm text-gray-600">{hashtag.count.toLocaleString()} tweets</p>
          </div>
        ))}
      </div>
    </div>
  );
}