"use server";

import { getResetTokenByToken } from "@/data/auth/resettoken";
import { getUserByEmail } from "@/data/auth/user";
import prisma from "@/lib/prismaClient";
import { passwordschema } from "@/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const verifyResetPasswordToken = async (
   token: string,
   data: z.infer<typeof passwordschema>
) => {
   const validpassword = passwordschema.safeParse(data);

   if (!validpassword.success) {
      return { error: "Invalid password" };
   }

   const { password } = validpassword.data;

   try {
      const existingToken = await getResetTokenByToken(token);

      if (!existingToken) {
         return { error: "Token not found" };
      }

      const tokenExpire = new Date(existingToken.expires) < new Date();

      if (tokenExpire) {
         return { error: "Token is expired" };
      }

      const user = await getUserByEmail(existingToken.email);

      if (!user) {
         return { error: "email not found" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
         where: {
            email: existingToken.email,
         },
         data: {
            emailVerified: new Date(),
            email: existingToken.email,
            password: hashedPassword,
         },
      });

      await prisma.passwordResetToken.delete({
         where: {
            id: existingToken.id,
         },
      });

      return { success: "password updated " };
   } catch (error) {
      console.log(error);
   }
};
