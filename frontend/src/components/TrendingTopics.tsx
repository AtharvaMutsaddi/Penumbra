import React from 'react';
import { TrendingUp } from 'lucide-react';

const trends = [
  { topic: "OpenAI's Latest Release", volume: 528000 },
  { topic: "#WorldCup2026", volume: 423000 },
  { topic: "SpaceX Starship", volume: 385000 },
  { topic: "Taylor Swift New Album", volume: 312000 },
  { topic: "Climate Summit 2024", volume: 298000 }
];

export default function TrendingTopics() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-bold">Trending Topics</h2>
      </div>
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-500">#{index + 1}</span>
              <span className="font-medium">{trend.topic}</span>
            </div>
            <span className="text-sm text-gray-600">{trend.volume.toLocaleString()} tweets</span>
          </div>
        ))}
      </div>
    </div>
  );
}