import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Hash } from "lucide-react";
import { fetchTopHashtags } from "../../services/twitterApi";

export default function TopHashtagChart(props) {
  const [hashtags, setHashtags] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await fetchTopHashtags(props.category);
      const sortedData = Object.entries(resp)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6) // Select top 6 hashtags
        .map(([name, count]) => ({ name, count: count * 1000 })); // Format for Recharts
      setHashtags(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const barColors = ["#FF5733", "#FF8D33", "#FFC133", "#33FF57", "#33FFBD", "#3385FF"];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Hash className="w-5 h-5 text-green-500" />
        <h2 className="text-xl font-bold">Top Hashtags</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={hashtags} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="count" radius={[5, 5, 0, 0]}>
            {hashtags.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
TopHashtagChart.defaultProps={
    category:"general"
}