import { GoogleGenerativeAI } from "@google/generative-ai";
import { googleApiKey } from "./secrets";
const genAI = new GoogleGenerativeAI(googleApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function makeGeminiRequest(posts,hashtags,category){
    const formattedPosts=posts.join("\n ");
    const formattedHashtags=hashtags.join(", ");
    const prompt = `You an expert social media content creator. Given the following trending posts for the ${category} category, please give 10 newer post suggestions for me to create unique trending content. These are the trending posts: ${formattedPosts}. These are the trending hashtags: ${formattedHashtags}.`;
    console.log(prompt)
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
}