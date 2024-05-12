import prisma from "@/lib/prismaClient";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";


export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: PrismaAdapter(prisma),
   ...authConfig,
   session: {
      strategy: "jwt",
   },
   pages: {
      signIn: "/auth/login",
      error: "/auth/error",
   },

   events: {
      async linkAccount({ user }) {
         await prisma.user.update({
            where: {
               id: user.id,
            },
            data: {
               emailVerified: new Date(),
            },
         });
      },
   },

   callbacks: {
      async signIn({ user, account }) {
         //  we have already done this in the login action but we should  do it here as well for extra security and here is important.
         if (account.provider !== "credentials") return true;

         const existingUser = await getUserById(user.id);

         if (!existingUser.emailVerified) return false;

         // Todo :  Add 2fa verify

         return true;
      },
      async jwt({ token, user }) {
         return token;
      },
      async session({ session, token, user }) {
         // Add property to session, like an access_token from a provider. you can as many as you want
         if (token.sub && session.user) {
            session.user.id = token.sub;
         }
         return session;
      },
   },
});
