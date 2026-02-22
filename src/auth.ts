import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                phone: { label: "Téléphone", type: "text" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.phone || !credentials?.password) return null;

                const admin = await prisma.admin.findUnique({
                    where: { phone: credentials.phone as string },
                });

                if (!admin) return null;

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    admin.password
                );

                if (!isPasswordValid) return null;

                return {
                    id: admin.id,
                    name: admin.name,
                    phone: admin.phone,
                };
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.phone = (user as any).phone;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                (session.user as any).phone = token.phone;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
