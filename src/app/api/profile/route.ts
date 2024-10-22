import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { writeFile } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const session = await getServerSession();

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const file = formData.get('profileImage') as File | null;

    if (!file || !file.size) {
        return NextResponse.json({ error: 'File gambar tidak ditemukan' }, { status: 400 });
    }

    let profileImagePath = null;

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + '_' + file.name.replaceAll(' ', '_');
        const filepath = join(process.cwd(), 'public/uploads', filename);

        await writeFile(filepath, buffer);
        profileImagePath = `/uploads/${filename}`;
    } catch (err) {
        console.error('Gagal menyimpan file:', err);
        return NextResponse.json({ error: 'Gagal menyimpan file' }, { status: 500 });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { email: session.user.email! },
            data: { 
                name: name,
                profileImage: profileImagePath,
            },
        });

        return NextResponse.json({ message: 'Profil berhasil diperbarui', user: updatedUser });
    } catch (error) {
        console.error('Gagal memperbarui profil:', error);
        return NextResponse.json({ error: 'Gagal memperbarui profil' }, { status: 500 });
    }
}

