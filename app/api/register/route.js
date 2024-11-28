import { NextResponse } from "next/server";
import { regiseterUser } from "@/app/actions/register";

export async function POST(request) {
    const { email, password, name } = await request.json();

    try {
        const response = await registerUser({ email, password, name });
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}