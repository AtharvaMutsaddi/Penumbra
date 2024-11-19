import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: "Tech", count: 922000, color: "#3b82f6", propName: "tech" },
  { name: "Sport", count: 667005, color: "#10b981", propName: "sports" },
  { name: "Music", count: 345000, color: "#a855f7", propName: "music" },
  { name: "Food", count: 165432, color: "#f97316", propName: "food" },
  { name: "Art", count: 101900, color: "#ec4899", propName: "art" },
  { name: "News", count: 982017, color: "#f43f5e", propName: "general" },
];

export default function CategoryStats() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="w-5 h-5 text-indigo-500" />
        <h2 className="text-xl font-bold">Category Statistics</h2>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categories} margin={{ top: 20, right: 0, left: 0, bottom: 40 }}>
            <XAxis
              dataKey="name"
              tick={({ x, y, payload }) => (
                <Link to={`/twitter/category/${categories[payload.index].propName}`}>
                  <text
                    x={x}
                    y={y + 20}
                    textAnchor="middle"
                    style={{
                      fontSize: "12px",
                      fill: "#4B5563",
                      cursor: "pointer",
                    }}
                    transform={`rotate(-30, ${x}, ${y + 20})`} // Rotate labels
                  >
                    {payload.value.length > 4 ? `${payload.value.slice(0,5)}` : payload.value}
                  </text>
                </Link>
              )}
            />
            <YAxis tick={{ fontSize: 14, fill: "#4B5563" }} />
            <Tooltip
              formatter={(value) => value.toLocaleString()}
              contentStyle={{ fontSize: "14px" }}
            />
            <Bar dataKey="count" radius={[5, 5, 0, 0]}>
              {categories.map((category, index) => (
                <Cell key={index} fill={category.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
