import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Heart, MessageCircle } from 'lucide-react';
import { fetchTrendingVideos } from '../../../services/youtubeApi';
import { useNavigate } from 'react-router-dom';

const categories = [
  { ID: 1, Title: 'Film & Animation' },
  { ID: 2, Title: 'Autos & Vehicles' },
  { ID: 10, Title: 'Music' },
  { ID: 15, Title: 'Pets & Animals' },
  { ID: 17, Title: 'Sports' },
  { ID: 20, Title: 'Gaming' },
  { ID: 22, Title: 'People & Blogs' },
  { ID: 23, Title: 'Comedy' },
  { ID: 24, Title: 'Entertainment' },
  { ID: 25, Title: 'News & Politics' },
  { ID: 26, Title: 'Howto & Style' },
  { ID: 28, Title: 'Science & Technology' },
];

const formatNumber = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  } else {
    return num;
  }
};

const TrendingVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async (categoryID) => {
    try {
     const resp = await fetchTrendingVideos(categoryID);
      setVideos(resp);
      console.group(resp)
    } catch (error) {
      console.error(error);
    }
  }; 

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(videos.length / videosPerPage))
    );

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  return (
    <div>
    {videos && videos.length > 0 ? (
      <div className="bg-white rounded-xl shadow-lg p-6" style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginLeft: "20px" }}>
            Trending Videos
          </h2>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "6px",
              fontSize: "16px",
              backgroundColor: "#f1f1f1",
              border: "1px solid #ccc",
              outline: "none",
            }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.ID} value={category.ID}>
                {category.Title}
              </option>
            ))}
          </select>
        </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
            }}
          >
            {currentVideos.map((video) => (
              <div
                key={video.id}
                style={{
                  display: 'flex',
                  background: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow =
                    '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
                onClick={() => navigate(`/youtube/${video.id}`)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    width: '50%',
                  }}
                >
                  <img
                    src={video.thumbnails}
                    alt={video.title}
                    style={{
                      height: '160px',
                      width: '220px',
                      objectFit: 'fill',
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: '15px',
                    width: '50%',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      color: '#333',
                      WebkitLineClamp: 4,

                    }}
                  >
                    {video.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#777',
                      marginBottom: '12px',
                      fontStyle: 'italic',
                    }}
                  >
                    {video.channelTitle}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: '15px',
                      alignItems: 'center',
                      fontSize: '14px',
                      color: '#555',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Eye size={16} color="#4caf50" />
                      {formatNumber(video.statistics.viewCount)}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Heart size={16} color="#f44336" />
                      {formatNumber(video.statistics.likeCount)}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <MessageCircle size={16} color="#2196f3" />
                      {formatNumber(video.statistics.commentCount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{
                padding: '10px',
                marginRight: '10px',
                background: '#f1f1f1',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ChevronLeft size={20} style={{ marginRight: '5px' }} />
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={
                currentPage === Math.ceil(videos.length / videosPerPage)
              }
              style={{
                padding: '10px',
                background: '#f1f1f1',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Next
              <ChevronRight size={20} style={{ marginLeft: '5px' }} />
            </button>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#888' }}>
          No videos available for the selected category.
        </p>
      )}
    </div>
  );
};

export default TrendingVideos;
