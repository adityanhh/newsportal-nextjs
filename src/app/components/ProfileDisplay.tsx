import { User } from "@prisma/client";
import { FaEnvelope, FaUserAlt } from "react-icons/fa"; // Tambahkan ikon

type ProfileDisplayProps = {
    user: User;
};

export default function ProfileDisplay({ user }: ProfileDisplayProps) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Informasi Profil
            </h2>
            <div className="flex items-center space-x-4 mb-4">
                <FaEnvelope className="text-gray-600" />
                <p className="text-gray-700">
                    <strong>Email:</strong> {user.email}
                </p>
            </div>
            <div className="flex items-center space-x-4">
                <FaUserAlt className="text-gray-600" />
                <p className="text-gray-700">
                    <strong>Nama:</strong> {user.name || "Belum diatur"}
                </p>
            </div>
            {/* Tambahkan field lain sesuai kebutuhan */}
        </div>
    );
}
