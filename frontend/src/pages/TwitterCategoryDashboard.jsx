import React from 'react'
import { X } from 'lucide-react';
import {useParams} from 'react-router-dom';
import TopHashtagChart from '../components/TopHashtagChart';
import TrendingTopics from '../components/TrendingTopics';
import TopCreators from '../components/TopCreators';
import TopTweets from '../components/TopTweets';
function TwitterCategoryDashboard() {
    var { category }=useParams() || { category: 'general' };
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <X className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">{category} Analytics Dashboard</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <TrendingTopics />
          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            <TopCreators category={category}/>
          </div>

          {/* Right Column */}
          <div>
            <TopHashtagChart category={category}/>
          </div>
        </div>
        <TopTweets category={category}/>
      </main>
    </div>
  )
}

export default TwitterCategoryDashboard
