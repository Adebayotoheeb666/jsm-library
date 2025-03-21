// app/api/auth/signout/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Import the auth configuration
import NextAuth, { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt"; // Correct import for JWT
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

export async function POST() {
  try {
    const { handlers, signIn, signOut } = NextAuth({

      session: {
        strategy: "jwt",
      },
      providers: [
        CredentialsProvider({
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              return null;
            }
    
            const email = credentials.email.toString();
            const password = credentials.password.toString();
    
            const user = await db
              .select()
              .from(users)
              .where(eq(users.email, email))
              .limit(1);
    
            if (user.length === 0) return null;
    
            const isPasswordValid = await compare(password, user[0].password);
    
            if (!isPasswordValid) return null;
    
            return {
              id: user[0].id.toString(),
              email: user[0].email,
              name: user[0].fullName,
            } as User;
          },
        }),
      ],
      pages: {
        signIn: "/sign-in",
      },
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.name = user.name;
          }
    
          return token;
        },
        async session({ session, token }) {
          if (session.user) {
            session.user.id = token.id as string;
            session.user.name = token.name as string;
          }
    
          return session;
        },
      },
    });
    


    // Call the signOut method to perform the sign-out operation
    await signOut({ redirect: false });


    return NextResponse.json({ message: "Signed out successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error during sign-out:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
