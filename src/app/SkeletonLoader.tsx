import React from 'react';

export function NewsListSkeleton() {
    return (
        <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white shadow-md rounded-md overflow-hidden animate-pulse">
                    <div className="w-full h-36 bg-gray-300"></div>
                    <div className="p-3">
                        <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
                        <div className="bg-gray-300 h-3 w-1/2 mb-4 rounded"></div>
                        <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}

export function ImageSliderSkeleton() {
    return (
        <div className="relative w-full max-w-4xl mx-auto mt-10 overflow-hidden rounded-lg shadow-lg">
            {/* Skeleton Slider */}
            <div className="flex animate-pulse">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                        <div className="w-full h-64 bg-gray-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="w-3/4 h-6 bg-gray-400 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                {/* Left Arrow Skeleton */}
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                {/* Right Arrow Skeleton */}
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 flex justify-center w-full p-4 space-x-2">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-3 h-3 bg-gray-400 rounded-full"></div>
                ))}
            </div>
        </div>
    )
}

export function LatestNewsSkeleton() {
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 bg-gray-200 h-6 rounded-md animate-pulse"></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-gray-200 h-60 rounded-md overflow-hidden shadow-md animate-pulse">
                        <div className="bg-gray-300 h-36 w-full"></div>
                        <div className="p-3">
                            <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded-md"></div>
                            <div className="bg-gray-300 h-3 w-1/2 mb-2 rounded-md"></div>
                            <div className="bg-gray-300 h-3 w-2/3 mb-2 rounded-md"></div>
                            <div className="bg-gray-300 h-3 w-1/2 rounded-md"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}