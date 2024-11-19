import { useState, useEffect } from "react";
import { Sigma, Hourglass, Heart, MessageCircle, Globe } from "lucide-react";
import axios from "axios";

export const InstagramCategoryPopularity = ({ category }: { category: string }) => {
    const [stats, setStats] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://127.0.0.1:5000/instagram/categorypopularity", {
                params: { category }
            });
            setStats(result.data);
        };

        fetchData();
    }, [category]);

    const icons = [
        { component: Sigma, color: "text-blue-500", title: "Total Posts" },
        { component: Hourglass, color: "text-purple-500", title: "Posts per Hour" },
        { component: Heart, color: "text-red-500", title: "Average Likes per Post" },
        { component: MessageCircle, color: "text-green-500", title: "Average Comments per Post" },
    ];

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-xl font-bold">Popularity</h2>
                </div>
            <div className="space-y-4">
                {stats.map((stat, index) => {
                    const Icon = icons[index]?.component;
                    return (
                        <h2 key={index} className="flex items-center gap-4 text-lg font-medium text-gray-700">
                            <span className={`p-2 rounded-full bg-gray-100 ${icons[index]?.color}`}>
                                <Icon size={28} />
                            </span>
                            <span>
                                <span className="font-semibold">{icons[index]?.title}:</span> {stat.split(":")[1]}
                            </span>
                        </h2>
                    );
                })}
            </div>
        </div>
    );
};
