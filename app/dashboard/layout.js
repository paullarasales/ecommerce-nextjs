"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/signin");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "authenticated") {
        return (
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <span className="text-xl font-semibold">Dashboard</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span>{session?.user?.email}</span>
                                <button onClick={() => signOut()}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="flex">
                    <aside className="w-64 bg-white h-screen shadow-sm">
                        <nav className="mt-5 px-2">
                            <Link
                                href="/dashboard"
                                className="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-50"
                            >
                                Overview
                            </Link>
                            <Link
                                href="/dashboard/profile"
                                className="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-50"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/dashboard/settings"
                                className="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-50"
                            >
                                Settings
                            </Link>
                        </nav>
                    </aside>
                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
            </div>
        );
    }

    return null;
}