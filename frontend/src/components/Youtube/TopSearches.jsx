import React, { useEffect, useState } from "react";
import {fetchTopSearches } from "../../../services/youtubeApi"; 
import { Eye } from "lucide-react";

const TopSearches = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchTopSearches(); 
        setVideos(resp);
      } catch (error) {
        console.error("Error fetching playlist videos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        // height: "calc(100vh - 100px)",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        height: "58vh",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        background: "white"
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
          textAlign: "center",
          gridColumn: "span 2"
        }}
      >
        Top Searched Videos
      </h3>
      {videos.length > 0 ? (
        videos.map((video) => (
          <div
            key={video.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
            onClick={() => onVideoSelect(video.id)}
          >
            <img
              src={video.thumbnails}
              alt={video.title}
              style={{
                width: "100px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            />
            <div>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "#333",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100px",
                }}
              >
                {video.title}
              </h4>
              <p
                style={{
                  fontSize: "12px",
                  color: "#777",
                  marginBottom: "5px",
                }}
              >
                {video.channelTitle}
              </p>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  color: "#555",
                }}
              >
                {/* <Eye size={14} color="#4caf50" style={{ marginRight: "5px" }} /> */}
                {/* {video.statistics.viewCount.toLocaleString()} views */}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No videos found.</p>
      )}
    </div>
  );
};

export default TopSearches;
