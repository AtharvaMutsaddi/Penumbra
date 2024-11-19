import { Hash } from 'lucide-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud-react18';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

export const InstagramTopHashtags = ({ category }: { category: string }) => {
    type HashTag = { text: string, value: number };
    const [hashtags, setHashtags] = useState<HashTag[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                "http://127.0.0.1:5000/instagram/tophashtags",
                { params: { category } }
            );
            setHashtags(result.data);
        };

        fetchData();
    }, [category]);

    if (category === "general") {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Hash className="w-5 h-5 text-green-500" />
                    <h2 className="text-xl font-bold">Top Hashtags</h2>
                </div>
                {hashtags.map((hashtag, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                        <p className="text-green-500 font-bold">{hashtag.text}</p>
                        <p className="text-sm text-gray-600">
                            {hashtag.value.toLocaleString()} posts
                        </p>
                    </div>
                ))}
            </div>
        );
    } else {
        const callbacks = {
            getWordTooltip: (word: HashTag) => `${word.text}: ${word.value} posts`,
        };

        return (
            <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <Hash className="w-5 h-5 text-green-500" />
                    <h2 className="text-xl font-bold">Top Hashtags</h2>
                </div>
                <div className="relative h-96">
                    {/* Constrain the word cloud to the container */}
                    <ReactWordcloud
                        words={hashtags}
                        size={[350, 350]} // Adjust size for better fit
                        callbacks={callbacks}
                        options={{
                            fontSizes: [20, 50], // Allow varying word sizes
                            rotations: 2,
                            rotationAngles: [-10, 10],
                            padding: 1,
                        }}
                    />
                </div>
            </div>
        );
    }
};
