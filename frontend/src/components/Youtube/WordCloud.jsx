import React, { useState, useEffect } from "react";
import { fetchWordCloud } from "../../../services/youtubeApi";

function WordCloud({ videoId }) {
  const [wordCloudImage, setWordCloudImage] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (videoId) => {
    try {
      const response = await fetchWordCloud(videoId);
      setWordCloudImage(URL.createObjectURL(response));
      console.log("image fetched");
    } catch (err) {
      setError(
        err.message || "An error occurred while fetching the word cloud"
      );
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchData(videoId);
    }
  }, []);

  return (
    <div style={{textAlign:"center"}}>
      <h2>Top Keywords</h2>
    <div style={{ textAlign: "center", padding: "20px", paddingBottom: "0"}}>
      {/* <h2 className="text-md font-semibold">Top Keywords</h2> */}
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : wordCloudImage ? (
        <img
          src={wordCloudImage}
          alt="Word Cloud"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
        />
      ) : (
        <p>Loading word cloud...</p>
      )}
    </div></div>
  );
}

export default WordCloud;
