"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Suspense, useState } from 'react';

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); s
    const [loading, setLoading] = useState(false);

    const handleRegistrationClick = async () => {
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, name }),
            });


        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message || "An error occured");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn('google', {
                callbackUrl: callbackUrl,
            });
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

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
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Create an Account
                    </h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    <button
                        onClick={handleRegistrationClick}
                        className={`w-full flex items-center justify-center gap-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors`}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                </div>
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