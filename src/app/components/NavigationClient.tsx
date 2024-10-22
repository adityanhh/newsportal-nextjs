'use client'

import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

export default function NavigationClient() {
    const { data: session } = useSession() as { data: Session | null };
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    console.log(session?.user?.profileImage)

    return (
        <div className="relative group">
            {session?.user?.profileImage ? (
                <Image 
                    src={session.user.profileImage} 
                    alt="Profile" 
                    width={40} 
                    height={40} 
                    className="rounded-full cursor-pointer hover:opacity-80 transition duration-300"
                />
            ) : (
                <FaUserCircle className="text-white text-4xl cursor-pointer hover:text-blue-400 transition duration-300" />
            )}
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {session ? (
                    <>
                        <a href="/profile" className="block px-4 py-2 hover:bg-blue-500 hover:text-white transition">Profile</a>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white transition">
                            Logout
                        </button>
                    </>
                ) : (
                    <a href="/login" className="block px-4 py-2 hover:bg-blue-500 hover:text-white transition">Login</a>
                )}
            </div>
        </div>
    );
}
