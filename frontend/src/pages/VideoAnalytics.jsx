import React from "react";
import { useParams } from 'react-router-dom';
import TrendingVideos from "../components/Youtube/TrendingVideos";
import Comments from "../components/Youtube/Comments";
import TopSearches from "../components/Youtube/TopSearches";
import WordCloud from "../components/Youtube/WordCloud";
import { Youtube } from "lucide-react";
import SentimentPieChart from "../components/Youtube/SentimentPieChart";
import Sidebar from "../components/SideBar";
const VideoAnalytics = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar/>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Youtube className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold">YouTube Analytics Dashboard</h1>
          </div>
        </div>
      </header>

          <h2 style={{ fontSize: "28px", fontWeight: "bold", margin: "20px" }}>
          Comment Analysis
          </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <section>
          <WordCloud videoId={id} />
        </section>

        <section>
          <SentimentPieChart videoId={id} />
        </section>

        <section>
          <Comments videoId={id} />
        </section>
      </div>
    </div>
  );
};

export default VideoAnalytics;
