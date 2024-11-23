import React from "react";
import TrendingVideos from "../components/Youtube/TrendingVideos";
import TopChannels from "../components/Youtube/TopChannels";
import TopSearches from "../components/Youtube/TopSearches";
import VideoCategoryChart from "../components/Youtube/VideoCategoryChart";
import { Youtube } from "lucide-react";
import Sidebar from "../components/SideBar";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar/>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Youtube className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold">Youtube Analytics Dashboard</h1>
          </div>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "20px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div style={{ gridColumn: "span 2" }}>
          <TrendingVideos />
          <VideoCategoryChart/>
        </div>

        <div>
          <div style={{ marginBottom: "20px" }}>
            <TopChannels />
          </div>
          <div>
            <TopSearches />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
