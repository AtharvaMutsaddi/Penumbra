import { X } from 'lucide-react';
import { InstagramTopCreators } from "../components/InstagramTopCreators.tsx"
import { InstagramTopHashtags } from "../components/InstagramTopHashtags.tsx"
import { InstagramCategoryStats } from "../components/InstagramCategoryStats.tsx"
import { InstagramTimeDistribution } from '../components/InstagramTimeDistribution.tsx';
import { InstagramTopPosts } from '../components/InstagramTopPosts.tsx';

export const InstagramDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-3">
                        <X className="w-8 h-8 text-blue-500" />
                        <h1 className="text-2xl font-bold">Instagram Analytics Dashboard</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <InstagramCategoryStats />
                        <InstagramTopHashtags />

                    </div>

                    {/* Middle Column */}
                    <div className="space-y-8">
                        <InstagramTopCreators urlType="general" />
                        <InstagramTimeDistribution urlType='general' />
                    </div>

                    {/* Right Column */}
                    <div>
                        <InstagramTopPosts urlType='general' />
                    </div>
                </div>
            </main>
        </div>
    )
}