import React from 'react';
import TrendingTopics from '../components/TrendingTopics';
import TopCreators from '../components/TopCreators';
import TopHashtags from '../components/TopHashtags';
import CategoryStats from '../components/CategoryStats';
import TopTweets from '../components/TopTweets';
import Navbar from '../components/Navbar';
function TwitterDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar socialMediaPlatform="Twitter" clickable={true}></Navbar>
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
            <TopTweets/>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TwitterDashboard
