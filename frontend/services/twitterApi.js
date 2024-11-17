import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/twitter",
});

export const fetchTopCreators = async (category) => {
  try {
    const response = await instance.get(`/topcreators?category=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchTopHashtags = async (category) => {
  try {
    const response = await instance.get(`/tophashtags?category=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchTrends = async (category) => {
  try {
    const response = await instance.get(`/trends?category=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchTweetCounts = async (category) => {
  try {
    const response = await instance.get(`/tweetcounts?category=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchTweets = async (category) => {
  try {
    const response = await instance.get(`/tweets?category=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
