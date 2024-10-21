import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileEdit from "../components/ProfileEdit";

const prisma = new PrismaClient();

export default async function ProfilePage() {
    const session = await getServerSession();

    if (!session || !session.user) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
    });

    if (!user) {
        return <div>User tidak ditemukan</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Profil Pengguna</h1>
            <ProfileDisplay user={user} />
            <ProfileEdit user={user} />
        </div>
    );
}

