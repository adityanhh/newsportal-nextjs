'use client'

import Search from '@/app/components/Search';
import NavigationClient from './NavigationClient';

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
                    <NavigationClient />
                </div>
            </div>
        </nav>
    );
}
