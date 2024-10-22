'use client'

import { useState } from "react";
import { User } from "@prisma/client";
import Image from 'next/image';
import { FaCamera, FaSave, FaTimes } from 'react-icons/fa';

type ProfileEditProps = {
    user: User;
};

export default function ProfileEdit({ user }: ProfileEditProps) {
    const [name, setName] = useState(user.name || "");
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

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
                window.location.reload();
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
            const file = e.target.files[0];
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    if (!isEditing) {
        return (
            <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Edit Profil
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profil</h2>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Nama
                </label>
                <input
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">
                    Foto Profil
                </label>
                <div className="relative">
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <label htmlFor="profileImage" className="cursor-pointer flex items-center justify-center w-32 h-32 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out">
                        {previewImage || user.profileImage ? (
                            <Image 
                                src={previewImage || user.profileImage!} 
                                alt="Profil" 
                                width={128} 
                                height={128} 
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <FaCamera className="text-gray-400 text-3xl" />
                        )}
                    </label>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
                    type="submit"
                >
                    <FaSave className="mr-2" />
                    Simpan Perubahan
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center"
                    type="button"
                    onClick={() => setIsEditing(false)}
                >
                    <FaTimes className="mr-2" />
                    Batal
                </button>
            </div>
        </form>
    );
}
