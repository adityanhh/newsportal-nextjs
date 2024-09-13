'use client'

import { NewsListSkeleton } from "@/app/SkeletonLoader";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RandomNews() {
    const [newsList, setNewsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRandomNews = async () => {
            try {
                const response = await axios.get('https://api-berita-indonesia.vercel.app/kumparan/terbaru/');
                const allNews = response.data.data.posts;

                const shuffledNews = allNews.sort(() => 0.5 - Math.random());
                const randomNews = shuffledNews.slice(0, 4);
                
                setNewsList(randomNews);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching random news:', error);
                setError('Failed to fetch news');
                setLoading(false);
            }
        };

        fetchRandomNews();
    }, []);

    if (loading) {
        return <NewsListSkeleton />;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (newsList.length === 0) {
        return <div className="text-center text-gray-700">No news available</div>;
    }

    return (
        <div className="container mx-auto p-3 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {newsList.map((news) => (
                    <div 
                        key={news.title} 
                        className="bg-white shadow-sm rounded-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-md"
                    >
                        <img 
                            src={news.thumbnail} 
                            alt="News Thumbnail" 
                            className="w-full object-cover" 
                            style={{ aspectRatio: '16/9' }}
                        />
                        <div className="p-2 sm:p-3">
                            {/* Smaller text on mobile (sm), normal on desktop (lg) */}
                            <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1">
                                {news.title}
                            </h3>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2">
                                {news.pubDate}
                            </p>
                            <a 
                                href={news.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs sm:text-sm lg:text-base text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
