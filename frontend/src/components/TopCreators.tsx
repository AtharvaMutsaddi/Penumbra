import React from 'react';
import { Users } from 'lucide-react';

const creators = [
  {
    name: "Tech Visionary",
    handle: "@techvision",
    viralPosts: 15,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60"
  },
  {
    name: "Nature Explorer",
    handle: "@wildlife",
    viralPosts: 12,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60"
  },
  {
    name: "Food Guru",
    handle: "@foodiechef",
    viralPosts: 10,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60"
  }
];

export default function TopCreators() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-purple-500" />
        <h2 className="text-xl font-bold">Top Creators</h2>
      </div>
      <div className="space-y-6">
        {creators.map((creator, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={creator.avatar} 
                alt={creator.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{creator.name}</h3>
                <p className="text-sm text-gray-500">{creator.handle}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-purple-500">{creator.viralPosts}</span>
              <p className="text-sm text-gray-500">viral posts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}