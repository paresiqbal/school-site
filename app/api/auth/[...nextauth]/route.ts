import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User as NextAuthUser } from "next-auth";

interface User {
  id: string;
  username: string;
}

interface CustomJWT extends JWT {
  id?: string;
  username?: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // authorize user
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          });

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          const result = await response.json();

          if (result.user && result.token) {
            // Return both user and token
            return { ...result.user, token: result.token };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: CustomJWT;
      user?: User | NextAuthUser | undefined;
    }) {
      // Add username to the token if user is available
      if (user && "username" in user) {
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: CustomJWT }) {
      // Attach username to the session object using an existing property
      if (token.username) {
        session.user = {
          ...session.user,
          name: token.username,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
