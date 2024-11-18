import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { fetchTopCreators } from '../../services/twitterApi';

export default function TopCreators(props) {
  const [creators, setCreators] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await fetchTopCreators(props.category);

      // Convert the response object to an array of objects with "userName" as a key
      const sortedData = Object.entries(resp)
        .map(([userName, details]) => ({ userName, ...details })) // Include the username
        .sort((a, b) => b.count - a.count); // Sort by the "count" field

      setCreators(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-purple-500" />
        <h2 className="text-xl font-bold">Top Creators</h2>
      </div>
      <div className="space-y-6">
        {creators.map((creator, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={creator["profile picture"]}
                alt={creator.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">
                  <a href={creator.url} className="hre">{creator.name}</a>
                </h3>
                <p className="text-sm text-gray-500">@{creator.userName}</p> {/* Using the userName */}
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-purple-500">{creator.count}</span>
              <p className="text-sm text-gray-500">viral posts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
TopCreators.defaultProps={
  category:"general"
}