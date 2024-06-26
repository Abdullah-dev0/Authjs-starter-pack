"use server";
import { sentVerificationEmail } from "@/lib/email";
import prisma from "@/lib/prismaClient";
import { signupSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { generateVerificationToken } from "./tokens";
export const signup = async (data: z.infer<typeof signupSchema>) => {
   const validatedData = signupSchema.safeParse(data);

   if (!validatedData.success) {
      return { error: "invalid fields" };
   }

   const { email, username, password } = validatedData.data;

   try {
      const existingUser = await prisma.user.findFirst({
         where: {
            email,
         },
      });

      if (existingUser) {
         return { error: "User already exists" };
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await prisma.user.create({
         data: {
            email,
            username,
            password: hashedPassword,
         },
      });

      if (!newUser) {
         return { error: "User not created" };
      }

      const verificationToken = await generateVerificationToken(email);

      await sentVerificationEmail(
         verificationToken.email,
         verificationToken.token
      );

      return { success: "verification email sent please verify" };
   } catch (error) {
      console.log(error);
   }
};
