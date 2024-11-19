import { Hash } from 'lucide-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud-react18';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

export const InstagramTopHashtags = ({ category }: { category: string }) => {
    type HashTag = { text: string, value: number }
    let [hashtags, set_hashtags] = useState<HashTag[]>([])

    useEffect(() => {
        const fetch_data = async () => {
            const result = await axios.get("http://127.0.0.1:5000/instagram/tophashtags", { params: { "category": category } })
            set_hashtags(result.data)
        }

        fetch_data()
    }, [category])

    if (category === "general") {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Hash className="w-5 h-5 text-green-500" />
                    <h2 className="text-xl font-bold">Top Hashtags</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {hashtags.map((hashtag, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                        >
                            <p className="text-green-500 font-bold">{hashtag.text}</p>
                            <p className="text-sm text-gray-600">{hashtag.value.toLocaleString()} posts</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    else {
        const callbacks = {
            getWordTooltip: (word: HashTag) => `${word.text}:${word.value} posts`
        };
        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Hash className="w-5 h-5 text-green-500" />
                    <h2 className="text-xl font-bold">Top Hashtags</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ReactWordcloud words={hashtags} size={[420, 400]} callbacks={callbacks} options={{ fontSizes: [40, 40], rotationAngles: [-10, 10] }} />
                </div>
            </div>)
    }
}