import { NextResponse } from "next/server";
import { registerUser } from "@/app/actions/register";

export async function POST(request) {
    const { email, password, name } = await request.json();
    console.log("Received data in API:", { email, password, name });

    try {
        const response = await registerUser({ email, password, name });
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}