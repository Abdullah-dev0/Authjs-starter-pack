"use server";

import { signIn } from "@/auth";
import { connectToDatabase } from "@/lib/database";
import { loginSchema } from "@/schema";
import console from "console";
import { z } from "zod";

export const login = async (data: z.infer<typeof loginSchema>) => {
   const validatedData = loginSchema.parse(data);

   if (!validatedData) {
      throw new Error("Data is not valid");
   }

   try {
      await connectToDatabase();
      await signIn("credentials", data);
      console.log("Data is valid");
   } catch (error: any) {
      console.log("Error", error.message);
   }
};
