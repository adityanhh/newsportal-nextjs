'use client';
import { useState } from "react";

export default function Ads() {
    const [isVisible, setIsVisible] = useState(true);

    // Fungsi untuk menutup iklan
    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="w-full sm:w-[300px] sm:h-[550px] bg-gray-200 border border-gray-300 rounded-lg shadow-md p-4 flex items-center justify-center">
            <div className="relative p-4 w-full h-full flex flex-col items-center justify-center">
                {/* Close button (only visible on mobile) */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 sm:hidden"
                >
                    ✕
                </button>
                <p className="text-gray-700 text-center">Ads</p>
            </div>
        </div>
    );
}
