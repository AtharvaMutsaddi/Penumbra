import React, { useState, useEffect } from "react";
import { fetchTopChannels } from "../../../services/youtubeApi";
import { Users, Eye } from "lucide-react";

const TopChannels = () => {
  const [topChannels, setTopChannels] = useState([]);
  const top = 4;

  const fetchData = async (categoryID) => {
    try {
      const resp = await fetchTopChannels();
      const channels = resp.slice(0, top);
      setTopChannels(channels);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + 'B';
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4">Top Channels</h2>
      {topChannels.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {topChannels.map((channel) => (
            <div
            key={channel.id}
            className="bg-gray-100 p-4 rounded-lg shadow-sm"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              textAlign: "left",
            }}
          >
            <img
              src={channel.thumbnails}
              alt={channel.title}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <div style={{ flex: 1 }}>
              <h3 className="text-md font-semibold">{channel.title}</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4 mr-1  text-indigo-500" />
                  {formatNumber(channel.statistics.subscriberCount)}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Eye className="w-4 h-4 mr-1  text-indigo-500" />
                  {formatNumber(channel.statistics.viewCount)}
                </p>
              </div>
            </div>
          </div>
          
                    
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No top channels available.</p>
      )}
    </div>
  );
};

export default TopChannels;
