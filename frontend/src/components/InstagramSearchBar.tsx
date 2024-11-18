import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Search, X } from "lucide-react";

export const InstagramSearchBar = ({ type }: { type: string }) => {
    let [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();

    const handleSearch = (value: string) => {
        if (value === "general") {
            navigate(`/instagram/`);
        }
        else {
            navigate(`/instagram/category/${value}`, { replace: true });
        }

    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(searchQuery);
        }
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <X className="w-8 h-8 text-blue-500" />
                        <h1 className="text-2xl font-bold">Instagram {type.charAt(0).toUpperCase() + type.slice(1)} Analytics</h1>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-sm">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-3 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}