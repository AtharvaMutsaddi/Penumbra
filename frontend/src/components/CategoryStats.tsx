import React from 'react';
import { PieChart, Music, Code, LucideBatteryFull, Utensils, Palette } from 'lucide-react';

const categories = [
  { name: "Technology", icon: Code, count: 2345678, color: "text-blue-500" },
  { name: "Sports", icon: LucideBatteryFull, count: 1987654, color: "text-green-500" },
  { name: "Music", icon: Music, count: 1876543, color: "text-purple-500" },
  { name: "Food", icon: Utensils, count: 1654321, color: "text-orange-500" },
  { name: "Art", icon: Palette, count: 1543210, color: "text-pink-500" }
];

export default function CategoryStats() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="w-5 h-5 text-indigo-500" />
        <h2 className="text-xl font-bold">Category Statistics</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <Icon className={`w-8 h-8 ${category.color}`} />
              <div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count.toLocaleString()} tweets</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}