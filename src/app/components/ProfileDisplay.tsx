'use client'

import { User } from "@prisma/client";
import { FaEnvelope, FaUserAlt } from "react-icons/fa";
import Image from 'next/image';
import { useState } from 'react';

type ProfileDisplayProps = {
    user: User;
};

export default function ProfileDisplay({ user }: ProfileDisplayProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-6 max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Profil Saya
            </h2>
            <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                    <Image 
                        src={imageError || !user.profileImage ? "/default-profile-image.jpg" : user.profileImage}
                        alt="Profil" 
                        fill
                        sizes="(max-width: 128px) 100vw, 128px"
                        style={{ objectFit: 'cover' }}
                        onError={() => setImageError(true)}
                    />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700">
                    {user.name || "Nama belum diatur"}
                </h3>
            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg">
                    <FaEnvelope className="text-blue-500 text-xl" />
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Email</p>
                        <p className="text-gray-700">{user.email}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg">
                    <FaUserAlt className="text-blue-500 text-xl" />
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Nama</p>
                        <p className="text-gray-700">{user.name || "Belum diatur"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
