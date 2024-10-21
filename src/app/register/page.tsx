'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Password tidak cocok');
            return;
        }
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                router.push('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Terjadi kesalahan saat registrasi');
            }
        } catch (error) {
            setError('Terjadi kesalahan saat menghubungi server');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg transform transition-all hover:shadow-2xl duration-500">
                <h2 className="text-3xl font-extrabold text-center text-gray-900">
                    Sign Up
                </h2>
                <p className="text-sm text-center text-gray-600">
                    Create a new account
                </p>
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
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Sign up
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
