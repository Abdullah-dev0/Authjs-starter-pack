"use server";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { signupSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";
export const signup = async (data: z.infer<typeof signupSchema>) => {
   const validatedData = signupSchema.safeParse(data);

   if (!validatedData.success) {
      return { error: "invalid fields" };
   }

   const { email, username, password } = validatedData.data;

   try {
      await connectToDatabase();

      const existingUser = await User.findOne({
         $or: [{ email: data.email }, { username: data.username }],
      });

      if (existingUser) {
         return { error: "User already exists" };
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await User.create({
         email,
         username,
         password: hashedPassword,
      });

      if (!newUser) {
         return { error: "User not created" };
      }
   } catch (error) {
      console.log(error);
   }

   return { success: "user created sucessfuly" };
};
