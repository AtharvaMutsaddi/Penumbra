import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/youtube",
});

export const fetchTrendingVideos = async (category) => {
    try {
      const url = category ? `/trendingvideos?category=${category}` : '/trendingvideos';
      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchTopSearches = async (category) => {
    try {
      const response = await instance.get(`/topsearches`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchTopChannels = async (category) => {
    try {
      const response = await instance.get(`/topchannels`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchComments = async (videoId) => {
    try {
      const response = await instance.get(`/comments?videoId=${videoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchWordCloud = async (videoId) => {
    try {
      const response = await instance.get(`/wordcloud?videoId=${videoId}`, {
        responseType: 'blob', 
      });
      
      if (response.status === 200) {
        return response.data;
      } else {
        const errorText = await response.text(); 
        throw new Error(errorText || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching word cloud:", error);
      throw error;
    }
  };
  
  export const fetchSentiments = async (videoId) => {
    try {
      const response = await instance.get(`/sentimentanalysis?videoId=${videoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };