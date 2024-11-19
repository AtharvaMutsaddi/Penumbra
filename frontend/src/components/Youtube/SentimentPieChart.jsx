import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchSentiments } from "../../../services/youtubeApi";

const COLORS = ["#ff6b6b", "#8884d8", "#82ca9d"]; // Negative: Red, Neutral: Blue, Positive: Green

function SentimentPieChart({ videoId }) {
  const [summary, setSummary] = useState(null);

  const fetchData = async (videoId) => {
    try {
      const resp = await fetchSentiments(videoId);
      setSummary(resp); // Directly use response as it matches the required format
    } catch (error) {
      console.error("Error fetching sentiment data:", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchData(videoId);
    }
  }, [videoId]);

  const data = summary
    ? [
        { name: "Negative", value: summary.negative_count },
        { name: "Neutral", value: summary.neutral_count },
        { name: "Positive", value: summary.positive_count },
      ]
    : [];

  return (
    <div style={{ width: "100%", height: 400, textAlign: "center" }}>
      <h2>Sentiment Analysis</h2>
      {summary ? (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading sentiment data...</p>
      )}
    </div>
  );
}

export default SentimentPieChart;
