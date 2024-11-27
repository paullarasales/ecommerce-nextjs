import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email },
                        include: { accounts: true },
                    });

                    if (existingUser) {
                        const existingAccount = existingUser.accounts.find(
                            (acc) => acc.provider === 'google' &&
                                acc.providerAccountId === account.providerAccountId
                        );

                        if (existingAccount) {
                            return true;
                        }

                        try {
                            await prisma.account.create({
                                data: {
                                    userId: existingUser.id,
                                    type: account.type,
                                    provider: account.provider,
                                    providerAccountId: account.providerAccountId,
                                    access_token: account.access_token,
                                    expires_at: account.expires_at,
                                    token_type: account.token_type,
                                    scope: account.scope,
                                    id_token: account.id_token,
                                },
                            });
                            return true;
                        } catch (error) {
                            console.error("Error linking account:", error);
                            return true;
                        }
                    }

                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            emailVerified: new Date(),
                            accounts: {
                                create: {
                                    type: account.type,
                                    provider: account.provider,
                                    providerAccountId: account.providerAccountId,
                                    access_token: account.access_token,
                                    expires_at: account.expires_at,
                                    token_type: account.token_type,
                                    scope: account.scope,
                                    id_token: account.id_token,
                                },
                            },
                        },
                    });

                    return true;
                } catch (error) {
                    console.error("Error in signIn callback:", error);
                    return false;
                }
            }
            return true;
        },

        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },

        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
            }
            return session;
        },

        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl) || url.startsWith('/')) {
                return url;
            }
            return baseUrl;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    debug: true,
});

export const registerUser = async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }

            const hashedPassword = await bcrypt(password, 10);

            const verificationToken = uuidv4();
            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    emailVerified: false,
                    verificationToken,
                }
            });

            const verificationUrl = `${process.env.BASE_URL}/auth/verify?token=${verificationToken}`;
            await transporter.sendMail({
                to: email,
                subject: 'Verify your email',
                html: `<p>Please click the link below to verify your email:</p><a href="${verificationUrl}">Verify Email</a>`,
            });

            return res.status(201).json({ message: "User created successfully. Please check your email to verify." });
        } catch (error) {
            console.error("Error during registration:", error);
            return res.status(500).json({ error: "Interval server errror" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export { handler as GET, handler as POST, registerUser };
