'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { LatestNewsSkeleton, NewsListSkeleton } from "@/app/SkeletonLoader";

export default function NewsList() {
    const [newsList, setNewsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api-berita-indonesia.vercel.app/cnn/nasional/');
                // Limit the news to 6 items
                const limitedNews = response.data.data.posts.slice(0, 6);
                setNewsList(limitedNews);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <LatestNewsSkeleton />; // Return skeleton loader when loading
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Latest National News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsList && newsList.map((data) => (
                    <div key={data.title} className="bg-white shadow-md rounded-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
                        <img 
                            src={data.thumbnail} 
                            alt="News Thumbnail" 
                            className="w-full h-36 object-cover"
                        />
                        <div className="p-3">
                            <h3 className="text-md font-semibold mb-1">{data.title}</h3>
                            <p className="text-xs text-gray-600 mb-2">{data.pubDate}</p>
                            <p className="text-xs font-medium text-blue-600 mb-2">{data.name}</p> {/* Displaying category */}
                            <a 
                                href={data.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
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
