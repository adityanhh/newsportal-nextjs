import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    const session = await getServerSession();

    if (!session || !session.user) {
        return NextResponse.json({ message: "Tidak terautentikasi" }, { status: 401 });
    }

    try {
        const { name } = await request.json();

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email! },
            data: { name },
        });

        return NextResponse.json({ message: "Profil berhasil diperbarui", user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ message: "Terjadi kesalahan saat memperbarui profil" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
