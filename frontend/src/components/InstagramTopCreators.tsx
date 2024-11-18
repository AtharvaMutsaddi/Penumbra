import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import axios from 'axios';

export const InstagramTopCreators = ({ urlType }: { urlType: string }) => {
    type Creator = {
        category: string;
        fullName: string;
        postsCount: number;
        profilePicUrl: string;
        url: string;
        username: string;
    };

    let [creators, set_creators] = useState<Creator[]>([]);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                let url: string | null = null;

                if (urlType === "general") {
                    url = "http://127.0.0.1:5000/instagram/general/topcreators";
                } else {
                    url = "http://127.0.0.1:5000/instagram/general/topcreators";
                }

                const result = await axios.get(url);
                set_creators(result.data);
            } catch (error) {
                console.error("Error fetching creators:", error);
            }
        };

        fetch_data();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-bold">Top Creators</h2>
            </div>
            <div className="space-y-6">
                {creators.map((creator, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img
                                src={creator.profilePicUrl}
                                alt={creator.fullName}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <a href={creator.url}><h3 className="font-semibold">{creator.fullName}</h3></a>
                                <p className="text-sm text-gray-500">{creator.username}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="font-bold text-purple-500">{creator.postsCount}</span>
                            <p className="text-sm text-gray-500">{creator.category} posts</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
