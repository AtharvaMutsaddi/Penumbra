import { Hash } from 'lucide-react';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const InstagramTopHashtags = () => {
    type HashTag = { tag: string, count: number }
    let [hashtags, set_hashtags] = useState<HashTag[]>([])

    useEffect(() => {
        const fetch_data = async () => {
            const result = await axios.get("http://127.0.0.1:5000/instagram/general/tophashtags")
            set_hashtags(result.data)
        }

        fetch_data()
    }, [])

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
                        <p className="text-green-500 font-bold">{hashtag.tag}</p>
                        <p className="text-sm text-gray-600">{hashtag.count.toLocaleString()} posts</p>
                    </div>
                ))}
            </div>
        </div>
    );
}