'use client'

import { useState } from "react";
import { User } from "@prisma/client";

type ProfileEditProps = {
    user: User;
};

export default function ProfileEdit({ user }: ProfileEditProps) {
    const [name, setName] = useState(user.name || "");
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            if (response.ok) {
                setIsEditing(false);
                // Idealnya, kita akan memperbarui tampilan profil di sini
                alert("Profil berhasil diperbarui");
            } else {
                alert("Gagal memperbarui profil");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Terjadi kesalahan saat memperbarui profil");
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
