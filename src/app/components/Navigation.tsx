'use client'

import { FaUserCircle } from 'react-icons/fa';
import Search from '@/app/components/Search';  // Import Search component

export default function Navigation() {
    return (
        <nav className="bg-background2 p-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo/Title on the Left */}
                <div className="text-white text-2xl font-bold cursor-pointer hover:text-blue-400 transition duration-300">
                    Wyn.com
                </div>

                {/* User Icon and Search Input on the Right */}
                <div className="flex items-center space-x-4">
                    {/* Search Component */}
                    <Search />

                    {/* User Icon */}
                    <div className="relative group">
                        <FaUserCircle className="text-white text-4xl cursor-pointer hover:text-blue-400 transition duration-300" />
                        {/* Dropdown on hover */}
                        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a href="/login" className="block px-4 py-2 hover:bg-blue-500 hover:text-white transition">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
