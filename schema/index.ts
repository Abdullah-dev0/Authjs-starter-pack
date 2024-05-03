import z from "zod";

export const loginSchema = z.object({
   email: z.string().email({message: "Please enter a valid email"}),
   password: z.string().min(3).max(100),
});

export const signupSchema = z.object({
   email: z.string().email(),
   password: z.string().min(3).max(100),
   username: z.string().min(3).max(100),
});
