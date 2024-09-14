import NextAuth, { NextAuthOptions } from "next-auth";
import githubAuth from 'next-auth/providers/github'

const authOption: NextAuthOptions = {
    providers: [
        githubAuth({
            clientId: process.env.GITHUB_CLIENT || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || ''
}

const handler = NextAuth(authOption)

export {handler as GET, handler as POST}