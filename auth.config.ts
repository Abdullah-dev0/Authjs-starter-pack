import prisma from "@/lib/prismaClient";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { loginSchema } from "./schema";

export default {
   providers: [
      GitHub({
         clientId: process.env.GITHUB_CLIENT_ID,
         clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Google({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      Credentials({
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials) => {
            const validateFields = loginSchema.safeParse(credentials);

            if (validateFields.success) {
               const { email, password } = validateFields.data;

               const user = await prisma.user.findFirst({
                  where: {
                     email,
                  },
               });

               if (!user || !user.password) return null;

               const isPasswordValid = await bcrypt.compare(
                  password,
                  user.password
               );

               if (isPasswordValid) return user;
            }

            return null;
         },
      }),
   ],
} satisfies NextAuthConfig;
