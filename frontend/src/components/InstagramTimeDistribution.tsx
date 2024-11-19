import { useState, useEffect } from "react";
import axios from "axios";
import { Timer } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const InstagramTimeDistribution = ({ category }: { category: string }) => {
    type TimeDistribution = { name: string, count: number };
    let [slots, set_slots] = useState<TimeDistribution[]>([]);

    useEffect(() => {
        const fetch_data = async () => {
            const result = await axios.get("http://127.0.0.1:5000/instagram/timedistribution", { params: { "category": category } });
            set_slots(result.data);
        };

        fetch_data();
    }, [category]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const totalCount = slots.reduce((acc, slot) => acc + slot.count, 0);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center gap-2 mb-6">
                <Timer className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold">Time Statistics</h2>
            </div>

            <ResponsiveContainer width="100%" height={370}>
                <PieChart>
                    <Pie
                        data={slots}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="48%"
                        outerRadius={130}
                        fill="#8884d8"
                        label={({ index }) => {
                            const percent = (slots[index].count / totalCount) * 100;
                            return `${percent.toFixed(0)}%`; // Display calculated percentage
                        }}
                    >
                        {slots.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
