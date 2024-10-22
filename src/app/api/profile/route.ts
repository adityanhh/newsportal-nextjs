import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { writeFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    const session = await getServerSession();

    if (!session || !session.user) {
        return NextResponse.json({ message: "Tidak terautentikasi" }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const profileImage = formData.get('profileImage') as File | null;

        let profileImageUrl = undefined;

        if (profileImage) {
            const bytes = await profileImage.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const filename = `${session.user.email}-${Date.now()}${path.extname(profileImage.name)}`;
            const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
            await writeFile(filepath, buffer);
            profileImageUrl = `/uploads/${filename}`;
        }

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email! },
            data: { 
                name,
                ...(profileImageUrl && { profileImage: profileImageUrl }),
            },
        });

        return NextResponse.json({ message: "Profil berhasil diperbarui", user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ message: "Terjadi kesalahan saat memperbarui profil" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

