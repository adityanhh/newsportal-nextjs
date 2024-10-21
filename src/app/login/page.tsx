/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Email atau password salah');
            } else {
                router.push('/');
            }
        } catch (error) {
            setError('Terjadi kesalahan saat login');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg transform transition-all hover:shadow-2xl duration-500">
                <h2 className="text-3xl font-extrabold text-center text-gray-900">
                    Log In
                </h2>
                {error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Sign in
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Belum punya akun?{' '}
                        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Daftar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
