import React, {useState,useEffect} from 'react';
import { Hash } from 'lucide-react';
import { fetchTwitterTopHashtags } from '../../services/twitterApi';

export default function TopHashtags() {
  const [hashtags, setHashtags] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await fetchTwitterTopHashtags("general");
      const sortedData = Object.entries(resp).sort((a, b) => b[1] - a[1]);
      setHashtags(sortedData.slice(0,6));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
            <p className="text-green-500 font-bold">#{hashtag[0]}</p>
            <p className="text-sm text-gray-600">{(hashtag[1]*1000).toLocaleString()} tweets</p>
          </div>
        ))}
      </div>
    </div>
  );
}