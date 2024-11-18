import { useState, useEffect } from 'react';
import axios from 'axios';
import { Boxes } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const InstagramCategoryStats = () => {
    type Category = { name: string, count: number };

    let [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://127.0.0.1:5000/instagram/general/categorystatistics");
                setCategories(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Format numbers in millions
    const formatYAxis = (value: number) => `${(value / 1_000_000).toFixed(1)}M`;

    return (
        <div style={{ width: '100%', height: '400px', padding: '20px' }} className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-6">
                <Boxes className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-bold">Category Statistics</h2>
            </div>

            <ResponsiveContainer>
                <BarChart
                    data={categories}
                    layout="horizontal"
                    barGap={30}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 30,
                        bottom: 90,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-60}
                        textAnchor="end"
                        tick={{ fontSize: 14 }}
                        height={40}
                    />
                    <YAxis
                        tickFormatter={formatYAxis}
                        tick={{ fontSize: 14 }}
                        width={40}
                    />
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} posts`} />
                    <Bar dataKey="count" fill="orange" barSize={80} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
