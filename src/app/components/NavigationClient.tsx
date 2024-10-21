'use client'

import { FaUserCircle } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function NavigationClient() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    return (
        <div className="relative group">
            <FaUserCircle className="text-white text-4xl cursor-pointer hover:text-blue-400 transition duration-300" />
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {session ? (
                    <>
                    <a href="/profile" className="block px-4 py-2 hover:bg-blue-500 hover:text-white transition">Profile</a>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white transition">
                        Logout
                    </button></>
                ) : (
                    <a href="/login" className="block px-4 py-2 hover:bg-blue-500 hover:text-white transition">Login</a>
                )}
            </div>
        </div>
    );
}
