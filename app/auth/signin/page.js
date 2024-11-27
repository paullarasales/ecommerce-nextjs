"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import axios from 'axios';

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleGoogleSignIn = async () => {
        try {
            await signIn('google', {
                callbackUrl: callbackUrl,
            });
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

    const handleManualSignUp = async (event) => {
        event.preventDefault();
        setError('')
        setSuccessMessage('');

        try {
            const response = await axios.post('/api/auth/register', { email, password });
            setSuccessMessage(response.data.message);
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Welcome
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in or create a new account
                    </p>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-2 bg-white px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    <Image
                        src="/google-icon.png"
                        alt="Google"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>

                <form onSubmit={handleManualSignUp} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm border-gray-300 rounded-md shadow-sm p-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function SignIn() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div>Loading...</div>
            </div>
        }>
            <SignInContent />
        </Suspense>
    );
}   