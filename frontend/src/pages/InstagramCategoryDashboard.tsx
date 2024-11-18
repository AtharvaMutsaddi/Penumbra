import { useParams } from 'react-router-dom';
import { InstagramTopCreators } from '../components/InstagramTopCreators.tsx';
import { InstagramSearchBar } from '../components/InstagramSearchBar.tsx';
import { InstagramTopHashtags } from '../components/InstagramTopHashtags.tsx';
import { InstagramCategoryPopularity } from '../components/InstagramCategoryPopularity.tsx';
import { InstagramTimeDistribution } from '../components/InstagramTimeDistribution.tsx';
import { InstagramTopPosts } from '../components/InstagramTopPosts.tsx';

export const InstagramCategoryDashboard = () => {
    let { category = "general" } = useParams<{ category: string }>() || {};

    return (
        <div className="min-h-screen bg-gray-100">
            <InstagramSearchBar type={category} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <InstagramTopHashtags category={category} />
                        <InstagramCategoryPopularity category={category} />
                    </div>

                    {/* Middle Column */}
                    <div className="space-y-8">
                        <InstagramTopCreators category={category} />
                        <InstagramTimeDistribution category={category} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <InstagramTopPosts category={category} n={20} />
                    </div>
                </div>
            </main>
        </div>
    )
}