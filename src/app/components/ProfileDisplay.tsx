import { User } from "@prisma/client";

type ProfileDisplayProps = {
    user: User;
};

export default function ProfileDisplay({ user }: ProfileDisplayProps) {
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-4">Informasi Profil</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Nama:</strong> {user.name || "Belum diatur"}</p>
            {/* Tambahkan field lain sesuai kebutuhan */}
        </div>
    );
}
