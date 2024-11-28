import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function registerUser({ email, password, name }) {
    console.log("Received Body:", { email, password, name });

    if (!email || !password || !name) {
        throw new Error("All fields are required");
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            emailVerified: new Date(),
        }
    });

    return { message: "User created successfully." };
}