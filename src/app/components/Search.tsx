'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // Function to handle search and fetch data from API
    const handleSearch = async () => {
        if (query.trim() === '') {
            setResults([]);
            setIsDropdownVisible(false);
            return;
        }

        try {
            const response = await axios.get('https://api-berita-indonesia.vercel.app/cnn/nasional/');
            const filteredResults = response.data.data.posts
                .filter((post: any) =>
                    post.title.toLowerCase().includes(query.toLowerCase())
                )
                .slice(0, 5); // Limit results to 5 items

            setResults(filteredResults);
            setIsDropdownVisible(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    // Handle input blur to hide dropdown
    const handleBlur = () => {
        setTimeout(() => setIsDropdownVisible(false), 100); // Delay to allow click on dropdown
    };

    // Handle input focus to show dropdown
    const handleFocus = () => {
        if (query.trim() !== '') {
            setIsDropdownVisible(true);
        }
    };

    // Update search results whenever query changes
    useEffect(() => {
        handleSearch();
    }, [query]);

    return (
        <div className="relative flex items-center">
            {/* Search Form */}
            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center bg-gray-700 rounded-md overflow-hidden"
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for news..."
                    className="bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-md w-full"
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-r-md transition duration-300"
                >
                    Search
                </button>
            </form>

            {/* Search Results Dropdown */}
            {isDropdownVisible && results.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md overflow-hidden z-50 mt-2">
                    {results.map((result, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer border-b last:border-none"
                        >
                            <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-gray-800">
                                {result.title}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
