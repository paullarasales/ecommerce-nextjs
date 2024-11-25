import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prisma = global.prisma || prisma;
}

export default prisma;