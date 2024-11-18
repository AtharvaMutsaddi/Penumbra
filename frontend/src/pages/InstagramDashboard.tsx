import { InstagramTopCreators } from "../components/InstagramTopCreators.tsx"
import { InstagramTopHashtags } from "../components/InstagramTopHashtags.tsx"
import { InstagramCategoryStats } from "../components/InstagramCategoryStats.tsx"
import { InstagramTimeDistribution } from '../components/InstagramTimeDistribution.tsx';
import { InstagramTopPosts } from '../components/InstagramTopPosts.tsx';
import { InstagramSearchBar } from '../components/InstagramSearchBar.tsx';

export const InstagramDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <InstagramSearchBar type='general' />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <InstagramCategoryStats />
                        <InstagramTopHashtags category="general" />

                    </div>

                    {/* Middle Column */}
                    <div className="space-y-8">
                        <InstagramTopCreators category="general" />
                        <InstagramTimeDistribution category='general' />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <InstagramTopPosts category='general' n={5} />
                    </div>
                </div>
            </main>
        </div>
    )
}