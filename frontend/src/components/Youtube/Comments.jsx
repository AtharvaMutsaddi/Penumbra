import React, { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { fetchComments } from "../../../services/youtubeApi";
import he from "he";

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const fetchData = async (videoId) => {
    try {
      const resp = await fetchComments(videoId);
      setComments(resp);
      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(videoId);
  }, []);
  return (
    <div
      className="bg-white shadow rounded-lg p-4"
      style={{ width: "500px", overflowY: "scroll", height: "100vh" }}
    >
      <h2 className="text-lg font-bold mb-4">Top Comments</h2>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex gap-3 mb-4"
          style={{
            alignItems: "flex-start",
            backgroundColor:
              comment.sentiment === "positive"
                ? "#e7f9e7" // Soft green background
                : comment.sentiment === "negative"
                ? "#f9e7e7" // Soft red background
                : "#f1f1f1", // Light gray background for neutral
            borderRadius: "10px", // Rounded corners
            padding: "15px", // Adequate padding for better spacing
            border: "1px solid #ddd", // Lighter border color
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
            transition: "transform 0.3s ease-in-out", // Smooth transition on hover
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.02)")
          } // Slight zoom effect on hover
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Reset zoom on leave
        >
          <div>
            <img
              src={comment.author_img}
              alt={comment.author}
              className="rounded-full"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800">
              {comment.author}
            </h4>
            <p
              className="text-sm text-gray-600"
              style={{
                marginTop: "5px",
                marginBottom: "10px",
                lineHeight: "1.4",
              }}
            >
              {he.decode(comment.comment)}
            </p>
            {/* <div className="flex gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {comment.likes > 0 ? comment.likes.toLocaleString() : "0"}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                Reply
              </span>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
