"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return null;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <p>Signed in as: {session.user?.email}</p>
            </div>
        </div>
    );
}