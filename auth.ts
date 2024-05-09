import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: PrismaAdapter(prisma),
   ...authConfig,
   session: {
      strategy: "jwt",
   },
   pages: {
      signIn: "/auth/signin",

      error: "/auth/error",
   },

   callbacks: {
      async jwt({ token, user }) {
         return token;
      },
      async session({ session, token, user }) {
         if (token.sub && session.user) {
            session.user.id = token.sub;
         }
         return session;
      },
   },
});
