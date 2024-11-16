import React from 'react';
import { X } from 'lucide-react';
import TrendingTopics from '../components/TrendingTopics';
import TopCreators from '../components/TopCreators';
import TopHashtags from '../components/TopHashtags';
import CategoryStats from '../components/CategoryStats';
import TopTweets from '../components/TopTweets';

function TwitterDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <X className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Twitter Analytics Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <TrendingTopics />
            <TopHashtags />
          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            <TopCreators />
            <CategoryStats />
          </div>

          {/* Right Column */}
          <div>
            <TopTweets />
          </div>
        </div>
      </main>
    </div>
  )
}

export default TwitterDashboard
