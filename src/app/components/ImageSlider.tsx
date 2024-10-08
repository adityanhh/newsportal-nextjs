'use client';

import { useEffect, useState } from "react";
import { ImageSliderSkeleton } from "@/app/SkeletonLoader"; // Import the skeleton loader
import { fetchNewsSlides, Slide } from "@/app/controller/Api"; // Import fungsi API

export default function ImageSlider() {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const fallbackSlides = [
        {thumbnail: "https://source.unsplash.com/random/800x600?nature1", title: "Random Image 1"},
        {thumbnail: "https://source.unsplash.com/random/800x600?nature2", title: "Random Image 2"},
        {thumbnail: "https://source.unsplash.com/random/800x600?nature3", title: "Random Image 3"},
        {thumbnail: "https://source.unsplash.com/random/800x600?nature4", title: "Random Image 4"}
    ];

    useEffect(() => {
        const loadSlides = async () => {
            try {
                const newsSlides = await fetchNewsSlides();
                setSlides(newsSlides);
                setLoading(false);
            } catch (error) {
                console.error('Error loading slides:', error);
                setSlides(fallbackSlides);
                setLoading(false);
            }
        };
        loadSlides();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    if (loading) {
        return <ImageSliderSkeleton /> // Return skeleton loader when loading
    }

    return (
        <div className="relative w-full max-w-4xl ml-10 mt-10 overflow-hidden rounded-lg shadow-lg">
            <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.length > 0 && slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                        <img
                            src={slide.thumbnail}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <h2 className="text-white text-xl font-bold opacity-70">{slide.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                {/* Left Arrow */}
                <button
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)}
                    className="text-white bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
                >
                    &#8249;
                </button>
                {/* Right Arrow */}
                <button
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)}
                    className="text-white bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
                >
                    &#8250;
                </button>
            </div>
            <div className="absolute bottom-0 flex justify-center w-full p-4 space-x-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? "bg-white" : "bg-gray-400"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
