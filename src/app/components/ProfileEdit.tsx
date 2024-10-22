'use client'

import { useState } from "react";
import { User } from "@prisma/client";
import Image from 'next/image';

type ProfileEditProps = {
    user: User;
};

export default function ProfileEdit({ user }: ProfileEditProps) {
    const [name, setName] = useState(user.name || "");
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                setIsEditing(false);
                alert("Profil berhasil diperbarui");
                window.location.reload(); // Refresh halaman untuk menampilkan perubahan
            } else {
                alert("Gagal memperbarui profil");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Terjadi kesalahan saat memperbarui profil");
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    if (!isEditing) {
        return (
            <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Edit Profil
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Nama
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">
                    Foto Profil
                </label>
                <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            {user.profileImage ? (
                <div className="mb-4">
                    <p className="text-gray-700 text-sm font-bold mb-2">Foto Profil Saat Ini:</p>
                    <Image 
                        src={user.profileImage} 
                        alt="Profil" 
                        width={100} 
                        height={100} 
                        className="rounded-full"
                        onError={(e) => {
                            e.currentTarget.src = "/default-profile-image.jpg";
                        }}
                    />
                </div>
            ) : (
                <div className="mb-4">
                    <p className="text-gray-700 text-sm font-bold mb-2">Belum ada foto profil</p>
                    <Image 
                        src="/default-profile-image.jpg" 
                        alt="Profil Default" 
                        width={100} 
                        height={100} 
                        className="rounded-full"
                    />
                </div>
            )}
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Simpan Perubahan
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => setIsEditing(false)}
                >
                    Batal
                </button>
            </div>
        </form>
    );
}
