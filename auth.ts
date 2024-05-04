import User from "@/lib/database/models/user.model";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./lib/database";
import { loginSchema } from "./schema";
export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
      Credentials({
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials) => {
            const validateFields = loginSchema.safeParse(credentials);

            if (validateFields.success) {
               await connectToDatabase();
               const { email, password } = validateFields.data;

               const user = await User.findOne({ email });

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
});
