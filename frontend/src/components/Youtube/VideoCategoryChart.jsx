import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { category: "Music", count: 6 },
  { category: "Sports", count: 3 },
  { category: "Travel & Events", count: 1 },
  { category: "Gaming", count: 2 },
  { category: "People & Blogs", count: 6 },
  { category: "Comedy", count: 5 },
  { category: "Entertainment", count: 23 },
  { category: "News & Politics", count: 2 },
  { category: "Howto & Style", count: 1 },
  { category: "Science & Technology", count: 1 },
];

const VideoCategoryChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 my-6" style={{ padding: "20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "20px", marginTop:"0px" }}>
            Category Wise Trend Analysis
          </h2>
    <BarChart
      width={900}
      height={400}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
    </div>
  );
};

export default VideoCategoryChart;
