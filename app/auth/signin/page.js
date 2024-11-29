"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Suspense, useState } from 'react';

function InputField({ type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="block w-full px-4 py-2 border rounded-md text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
    );
}

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        successMessage: '',
        loading: false,
    });

    const handleInputChange = (key) => (e) => {
        setFormState((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleRegistrationClick = async () => {
        setFormState((prev) => ({ ...prev, error: '', successMessage: '', loading: true }));

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formState.email,
                    password: formState.password,
                    name: formState.name,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');

            setFormState({
                name: '',
                email: '',
                password: '',
                error: '',
                successMessage: data.message,
                loading: false,
            });
        } catch (err) {
            setFormState((prev) => ({ ...prev, error: err.message, loading: false }));
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn('google', { callbackUrl });
        } catch (err) {
            setFormState((prev) => ({ ...prev, error: 'Google sign-in failed' }));
        }
    };

    const { name, email, password, error, successMessage, loading } = formState;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 bg-gray-100 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 focus:ring-2 focus:ring-indigo-500 transition"
                >
                    <Image
                        src="/google-icon.png"
                        alt="Google"
                        width={20}
                        height={20}
                    />
                    <span>Sign in with Google</span>
                </button>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700">Create an Account</h3>
                    <InputField
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={handleInputChange('name')}
                    />  
                    <InputField
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleInputChange('email')}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleInputChange('password')}
                    />
                    <button
                        onClick={handleRegistrationClick}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg transition-all ${loading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Sign Up'}
                    </button>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
            </div>
        </div>
    );
}

export default function SignIn() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}
