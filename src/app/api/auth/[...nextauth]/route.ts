import NextAuth, { NextAuthOptions } from "next-auth";
import githubAuth from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authOption: NextAuthOptions = {
    providers: [
        githubAuth({
            clientId: process.env.GITHUB_CLIENT || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || '',
    pages: {
        signIn: '/login',
        signOut: '/',
    },
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }
