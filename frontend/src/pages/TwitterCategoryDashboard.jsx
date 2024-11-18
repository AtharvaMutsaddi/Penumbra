import React from 'react'
import { X } from 'lucide-react';
import {useParams} from 'react-router-dom';
import TopHashtagChart from '../components/TopHashtagChart';
import TrendingTopics from '../components/TrendingTopics';
import TopCreators from '../components/TopCreators';
import TopTweets from '../components/TopTweets';
import Navbar from '../components/Navbar';
function TwitterCategoryDashboard() {
    var { category }=useParams() || { category: 'general' };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar socialMediaPlatform={"Twitter"} clickable={true} postCategory={category}></Navbar>
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
