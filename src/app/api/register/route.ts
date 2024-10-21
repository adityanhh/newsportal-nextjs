import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Periksa apakah email sudah terdaftar
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user baru
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: 'Registrasi berhasil' }, { status: 201 });
    } catch (error) {
        console.error('Kesalahan saat registrasi:', error);
        return NextResponse.json({ message: 'Terjadi kesalahan internal server' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
